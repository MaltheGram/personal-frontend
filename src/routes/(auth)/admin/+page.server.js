import { fail, redirect, json } from "@sveltejs/kit"
import { Session } from "$db/models/session"
import { User } from "$db/models/user"
import { Skill } from "$db/models/skills"
import { Project, validateProject } from "$db/models/projects"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY

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

	const userInSession = dbSession?.sessionUser
	const user = await User.findById(userInSession)

	if (!user) {
		throw redirect(302, "/login")
	}

	const serializedUser = {
		username: user.username,
		role: user.role,
		createdAt: user.createdAt.toISOString(),
		updatedAt: user.updatedAt.toISOString()

	}

	const skills = await Skill.find()

	const serializedSkills = skills.map(skill => {

		return {
			id: skill.id.toString(),
			name: skill.name,

		}
	}
	)
	return {
		user: serializedUser,
		skills: serializedSkills
	}

}

/** @type {import('./$types').Actions} */
export const actions = {
	skill: async ({ request }) => {
		const data = await request.formData()
		console.log(data)
		return { success: true }
	},
	project: async ({ request, fetch }) => {
		const data = await request.formData()
		if (data.get("create")) {
			const name = data.get("name")
			const description = data.get("description")
			const url = data.get("url")
			const skillsUsed = data.getAll("skills")

			const jsonData = { name, description, url, skillsUsed }

			const response = await fetch("/api/projects", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": API_KEY,
				},
				body: JSON.stringify(jsonData)
			})
			if (response.status === 200) {
				return { success: true }
			}
			else {
				console.error({ message: "Error creating project", status: response.status, error: response })
				return { error: true }
			}
		}
	},
	user: async ({ request }) => {
		const data = await request.formData()
		console.log(data)
		return { success: true }
	}
}


