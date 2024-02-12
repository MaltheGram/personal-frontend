import {
	Project,
	validateProject,
	getProjectsWithSkills
} from "$db/models/projects"
import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY

export const GET = async ({ }) => {
	const data = await getProjectsWithSkills()
	return json(data, {})
}

export const POST = async ({ request }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)

	const body = await request.json()
	const { error } = await validateProject(body)

	if (error)
		return json(
			{
				error: error.details[0].message
			},
			{
				status: 400
			}
		)
	const project = await new Project(body)
	const data = await project.save()
	return json(`Created new project in database: ${data}`)
}
