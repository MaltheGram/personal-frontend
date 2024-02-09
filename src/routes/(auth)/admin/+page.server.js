import { fail, redirect } from "@sveltejs/kit"
import { Session } from "$db/models/session"

export const load = async ({ cookies }) => {
	const localSession = cookies.get("session")
	const dbSession = await Session.findOne({ sessionId: localSession })

	if (localSession !== dbSession?.sessionId) {
		console.warn("Session mismatch. Someone might be trying to hack the system.")
		throw redirect(302, "/")
	}
	if (dbSession?.expires && new Date(dbSession.expires).getTime() < Date.now()) {
		cookies.delete("session", { path: "/" })
		const sessionToDelete = await Session.findOneAndDelete({ sessionId: localSession })
		throw redirect(302, "/")
	}

	if (!dbSession) throw redirect(302, "/login")
}
