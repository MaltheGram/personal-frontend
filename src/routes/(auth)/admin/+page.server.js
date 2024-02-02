import { fail, redirect } from "@sveltejs/kit"
import { Session } from "$db/models/session"

export const load = async ({ cookies }) => {
	const localSession = cookies.get("session")

	if (!localSession) throw redirect(302, "/login")
	
	const dbSession = await Session.findOne({ sessionId: localSession })
	if (!dbSession) throw redirect(302, "/login")
}
