import { User } from "$db/models/user"
import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY

export const GET = async ({ request, params }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)

	const user = await User.findOne({ username: params.username })

	if (!user)
		return json(
			{ error: "User not found" },
			{
				status: 404
			}
		)
	return json(user)
}
