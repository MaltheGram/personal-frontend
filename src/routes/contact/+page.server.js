import { API_KEY } from "$env/static/private"
import { fail } from "@sveltejs/kit"

/** @type {import('./$types').Actions} */
export const actions = {
	mailer: async ({ request, fetch }) => {
		const data = await request.formData()
		const content = data.get("content")
		const name = data.get("name")
		const email = data.get("email")
		const subject = data.get("subject")
		const headline = data.get("headline")

		if (!email) {
			return fail(400, { email, missing: true })
		}
		if (!content) {
			return fail(400, { content, missing: true })
		}
		if (!name) {
			return fail(400, { name, missing: true })
		}

		const jsonData = { name, content, email, headline, subject }

		const response = await fetch("/api/mailer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: API_KEY
			},
			body: JSON.stringify(jsonData)
		})
		if (response.status === 200) {
			return { success: true }
		} else {
			return { errro: true }
		}
	}
}
