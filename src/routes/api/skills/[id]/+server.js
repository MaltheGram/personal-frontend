import { Skill } from "$db/models/skills"
import { json } from "@sveltejs/kit"
import { API_KEY } from "$env/static/private"

export const GET = async ({ params }) => {
	const data = await Skill.find({ _id: params.id })
	return json(data, {})
}

export const DELETE = async ({ params, request }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)
	const id = params.id
	const skill = await Skill.deleteOne({ _id: id })

	if (skill.deleteCount === 0) {
		return json(
			{ error: `Skill with id ${id} does not exist` },
			{
				status: 404
			}
		)
	} else {
		return json(`Deleted skill from database: ${JSON.stringify(id)}`, {})
	}
}