import { fail, json, redirect } from "@sveltejs/kit"
import { API_KEY, NODEMAILER_EMAIL, APP_PASSWORD, SMTP_HOST, GOOGLE_MAIL } from "$env/static/private"
import nodemailer from "nodemailer"

export const POST = async ({ request }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		)
	const body = await request.json()

	const { name, email, content, subject } = body

	const transporter = nodemailer.createTransport({
		//service: "gmail",
		host: SMTP_HOST,
		port: 587,
		secure: false,
		auth: {
			user: NODEMAILER_EMAIL,
			pass: APP_PASSWORD
		}
	})
	const mailOptions = {
		from: NODEMAILER_EMAIL,
		to: GOOGLE_MAIL,
		subject: subject,
		html:
			`
			<h2>New message from your site!</h2>
			<p>
			<b>Name:</b> ${name}
			<br>
			<b>Email:</b> ${email}
			<br>
			<b>Content:</b> ${content}
		</p>`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error)
			console.error("Email not sent: " + error)
			fail(400, { error })
		} else {
			console.log("Email sent: " + info)
			console.log("Email sent: " + info.response)
			return json({ message: "success" })
		}
	})
	return new Response("OK")
}
