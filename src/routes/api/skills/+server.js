import { Skill, validateSkill } from "$db/models/skills"
import { json } from "@sveltejs/kit"
import { API_KEY, AWS_PREFIX } from "$env/static/private"
import AWS from "aws-sdk"

export const GET = async () => {
	const data = await Skill.find()
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
	const { error } = await validateSkill(body)

	if (error)
		return json(
			{
				error: error.details[0].message,
				Notices: `Please ensure values are spelled correctly. Be aware of white space.`
			},
			{
				status: 400
			}
		)

	Object.keys(body).forEach(key => {
		if (typeof body[key] === "string") {
			body[key] = body[key].toLowerCase()
		}
	})

	const skill = await new Skill(body)
	if (skill.logo) {
		skill.logo = `${AWS_PREFIX}/skill_images/${skill.name}`
	}

	const data = await skill.save()
	return json(`Created new skill in database: ${data}`)
}
