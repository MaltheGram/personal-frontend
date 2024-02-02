import { fail, json, redirect } from "@sveltejs/kit"
import { API_KEY, NODEMAILER_EMAIL } from "$env/static/private"
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
		host: "smtp.forwardemail.net",
		port: 465,
		secure: true,
		auth: {
			// TODO: replace `user` and `pass` values from <https://forwardemail.net>
			user: "x",
			pass: "x"
		}
	})
	const mailOptions = {
		from: email,
		to: NODEMAILER_EMAIL,
		subject: subject,
		text: content
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error)
			fail(400, { error })
		} else {
			console.log("Email sent: " + info.response)
			return json({ message: "success" })
		}
	})
	return new Response("OK")
}
