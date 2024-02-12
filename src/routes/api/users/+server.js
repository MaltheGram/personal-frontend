import { User, validateUser } from "$db/models/user"
import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import bcrypt from "bcrypt"
const API_KEY = env.API_KEY

export const GET = async ({ request, params }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)


	const users = await User.find()
	return json(users)
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
	const { error } = await validateUser(body)

	if (error)
		return json(
			{
				error: error.details[0].message,
				Notices: `Please ensure values are spelled correclty. Be aware of white space.`
			},
			{
				status: 400
			}
		)

	const user = await new User(body)
	user.password = bcrypt.hashSync(user.password, 10)

	const data = await user.save()
	return json(`Created new user in database: ${data}`)
}
