import { fail, redirect, json } from "@sveltejs/kit"
import { Session } from "$db/models/session"
import { User } from "$db/models/user"
import { Skill } from "$db/models/skills"
import { Project } from "$db/models/projects"
import { Experience } from "$db/models/experience"
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
			level: skill.level,
			logo: skill.logo,
			skillType: skill.skillType
		}
	})
	const projects = await Project.find()

	const serializedProjects = projects.map(project => {
		return {
			id: project.id.toString(),
			name: project.name,
			description: project.description,
			url: project.url,
			skillsUsed: project.skillsUsed.map(skill => skill.toString())
		}
	})

	const experiences = await Experience.find()

	const serializedExperiences = experiences.map(experience => {
		return {
			id: experience.id.toString(),
			company: experience.company,
			school: experience.school,
			startDate: experience.startDate,
			endDate: experience.endDate,
			description: experience.description,
			title: experience.title,
			associatedSkills: experience.associatedSkills.map(skill => skill.toString())
		}
	})

	return {
		user: serializedUser,
		skills: serializedSkills,
		projects: serializedProjects,
		experiences: serializedExperiences
	}

}

/** @type {import('./$types').Actions} */
export const actions = {
	skill: async ({ request, fetch }) => {
		const data = await request.formData()

		if (data.get("create")) {
			const formData = new FormData();
			formData.append("name", data.get("name"));
			formData.append("level", data.get("level"));
			const logo = data.get("logo");
			if (logo instanceof File) {
				formData.append("logo", logo, logo.name);
			}
			formData.append("skillType", data.get("skillType"));

			const response = await fetch("/api/skills", {
				method: "POST",
				headers: {
					"Authorization": API_KEY,
				},
				body: formData
			});

			if (response.status === 200) {
				return { success: true };
			} else {
				console.error({ message: "Error creating skill", status: response.status, error: response });
				return { error: true };
			}
		}

		if (data.get("delete")) {
			const id = data.get("id")
			const skill = await Skill.findById(id)

			const response = await fetch(`/api/skills/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": API_KEY,
				}
			})
			if (response.status === 200) {
				return { success: true, name: skill.name }
			}
			else {
				console.error({ message: "Error deleting skill", status: response.status, error: response })
				return { error: true }
			}
		}

		if (data.get("edit")) {

			const id = data.get("id");
			const name = data.get("name");
			const level = data.get("level");
			const logo = data.get("logo");
			const skillType = data.get("skillType");



			const formData = new FormData();
			formData.append("name", name);
			formData.append("level", level);

			if (logo instanceof File) {
				formData.append("logo", logo, logo.name);
			}
			formData.append("skillType", skillType);

			const response = await fetch(`/api/skills/${id}`, {
				method: "PUT",
				headers: {
					"Authorization": API_KEY,
				},
				body: formData
			});

			if (response.status === 200) {
				return { success: true };
			} else {
				console.error({ message: "Error editing skill", status: response.status, error: response });
				return { error: true };
			}


		}
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
		if (data.get("delete")) {
			const id = data.get("id")
			const project = await Project.findById(id)
			const response = await fetch(`/api/projects/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": API_KEY,
				}
			})
			if (response.status === 200) {
				return { success: true, name: project.name }
			}
			else {
				console.error({ message: "Error deleting project", status: response.status, error: response })
				return { error: true }
			}
		}
		if (data.get("edit")) {
			const id = data.get("id")
			const name = data.get("name")
			const description = data.get("description")
			const url = data.get("url")
			const skillsUsed = data.getAll("skills")

			const jsonData = { name, description, url, skillsUsed }

			const response = await fetch(`/api/projects/${id}`, {
				method: "PUT",
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
				console.error({ message: "Error editing project", status: response.status, error: response })
				return { error: true }
			}
		}
	},
	experience: async ({ request, fetch }) => {
		const data = await request.formData()

		if (data.get("create")) {
			const company = data.get("company")
			const school = data.get("school")
			const startDate = data.get("startDate")
			const endDate = data.get("endDate")
			const description = data.get("description")
			const title = data.get("title")
			const associatedSkills = data.getAll("skills")

			const jsonData = { company, school, startDate, endDate, description, title, associatedSkills }

			const response = await fetch("/api/experiences", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": API_KEY,
				},
				body: JSON.stringify(jsonData)
			});

			if (response.status === 200) {
				return { success: true };
			} else {
				console.error({ message: "Error creating experience", status: response.status, error: response });
				return { error: true };
			}
		}
		if (data.get("edit")) {
			const id = data.get("id")
			const company = data.get("company")
			const school = data.get("school")
			const startDate = data.get("startDate")
			const endDate = data.get("endDate")
			const description = data.get("description")
			const title = data.get("title")
			const associatedSkills = data.getAll("skills")

			const jsonData = { company, school, startDate, endDate, description, title, associatedSkills }

			const response = await fetch(`/api/experiences/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": API_KEY,
				},
				body: JSON.stringify(jsonData)
			});

			if (response.status === 200) {
				return { success: true };
			} else {
				console.error({ message: "Error editing experience", status: response.status, error: response });
				return { error: true };
			}

		}
		if (data.get("delete")) {
			const id = data.get("id")
			const experience = await Experience.findById(id)

			const response = await fetch(`/api/experiences/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": API_KEY
				}
			})

			if (response.status === 200) {
				return { success: true, title: experience.title }
			}
			else {
				console.error({ message: "Error deleting experience", status: response.status, error: response })
				return { error: true }
			}
		}



		return { success: true }
	}
}


