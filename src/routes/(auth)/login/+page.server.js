import { User } from "$db/models/user"
import { Session } from "$db/models/session"
import bcrypt from "bcrypt"
import { fail, error, json, redirect } from "@sveltejs/kit"
import crypto from "crypto"
import { ObjectId } from "mongodb"


export const load = async ({ request, cookies, url }) => {
	const localSession = cookies.get("session")
	const dbSession = await Session.findOne({ sessionId: localSession })

	if (localSession !== dbSession?.sessionId) {
		console.warn("Session mismatch. Someone might be trying to hack the system.")
		throw redirect(302, "/")
	}
	if (dbSession?.expires && new Date(dbSession.expires).getTime() < Date.now()) {
		cookies.delete("session", { path: "/" })
		const sessionToDelete = await Session.findOneAndDelete({ sessionId: localSession })
	}

	if (dbSession) {
		throw redirect(302, "/admin")
	}
}

export const actions = {
	login: async ({ request, cookies, url }) => {
		const data = await request.formData()
		const username = data.get("username")
		const password = data.get("password")

		const userInDb = await User.findOne({ username: username })

		if (!userInDb) {
			return fail(400, { username, missing: true })
		}

		if (userInDb.role !== "admin") {
			return fail(400, { username, notAdmin: true })
		}

		const passwordMatch = await bcrypt.compare(password, userInDb.password)
		if (!passwordMatch) {
			return fail(400, { password, incorrect: true })
		}

		const sessionId = crypto.randomBytes(16).toString("hex")
		const sessionData = {
			_id: new ObjectId(),
			sessionUser: userInDb._id.toString(),
			sessionId: sessionId,
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
		}

		const newSession = new Session(sessionData)
		await newSession.save()

		cookies.set("session", newSession.sessionId, {
			httpOnly: true,
			expires: newSession.expires,
			path: "/"
		})

		throw redirect(302, "/admin")
	}
}
