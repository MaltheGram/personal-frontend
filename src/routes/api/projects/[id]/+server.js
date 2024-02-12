import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY
import { Project, getSingleProjectWithSkills } from "$db/models/projects"
import { json } from "@sveltejs/kit"

export const GET = async ({ params }) => {
	const projectName = params.id
	const project = await getSingleProjectWithSkills(projectName)
	if (!project) {
		return json(
			{ error: `Project with name ${projectName} does not exist` },
			{
				status: 404
			}
		)
	} else {
		return json(project, {})
	}
}

export const DELETE = async ({ request, params }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)

	const id = params.id
	const project = await Project.deleteOne({ _id: id })

	if (project.deleteCount === 0) {
		return json(
			{ error: `Project with id ${id} does not exist` },
			{
				status: 404
			}
		)
	} else {
		return json(`Deleted pronject from database: ${JSON.stringify(id)}`, {})
	}
}
