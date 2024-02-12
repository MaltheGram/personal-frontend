import { fail, json, redirect } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY
const NODEMAILER_EMAIL = env.NODEMAILER_EMAIL
const APP_PASSWORD = env.APP_PASSWORD
const SMTP_HOST = env.SMTP_HOST
const GOOGLE_MAIL = env.GOOGLE_MAIL

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
	console.log(body)

	const { name, email, content, subject, headline } = body

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
		subject: headline,
		html:
			`
			<h2>New message from your site!</h2>
			<p>
			<b>Name:</b> ${name}
			<br>
			<b>Email:</b> ${email}
			<br>
			<b>Subject:</b> ${subject || "No subject provided"}
			<br>
			<b>Content:</b> ${content}
		</p>`
	}
	const mailResponse = transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.error(error)
			console.error("Email not sent: " + error)
			fail(500, { error })
		} else {
			console.log("Email sent: " + info.response)
			return json({ message: "success" })
		}
	})
	return new Response({ mailResponse })
}
