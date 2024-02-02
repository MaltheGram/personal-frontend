import { API_KEY } from "$env/static/private"

export const actions = {
	mailer: async ({ request, fetch }) => {
		const data = await request.formData()
		const content = data.get("content")
		const name = data.get("name")
		const email = data.get("email")
		const subject = data.get("subject")

		const jsonData = { name, content, email, subject }

		const response = await fetch("/api/mailer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: API_KEY
			},
			body: JSON.stringify(jsonData)
		})
	}
}
