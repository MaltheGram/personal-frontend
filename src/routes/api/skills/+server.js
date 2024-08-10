import { Skill, validateSkill } from "$db/models/skills"
import AWS from "aws-sdk";
import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY
const AWS_PREFIX = env.AWS_PREFIX

const s3 = new AWS.S3({
	accessKeyId: env.AWS_ACCESS_KEY_ID,
	secretAccessKey: env.AWS_SECRET_ACCESS_KEY
})


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
		);


	try {
		const body = await request.formData();
		const jsonBody = {
			name: body.get("name"),
			type: body.get("skillType"),
		};
		const { error } = await validateSkill(jsonBody);

		if (error) {
			return json(
				{
					error: error.details[0].message,
					notice: `Please ensure values are spelled correctly. Be aware of white space.`
				},
				{
					status: 400
				}
			);
		}

		Object.keys(jsonBody).forEach(key => {
			if (typeof jsonBody[key] === "string") {
				jsonBody[key] = jsonBody[key].toLowerCase();
			}
		});

		let fullFileType;
		const arrayBuffer = await body.get("logo").arrayBuffer();
		if (arrayBuffer.byteLength > 0) {
			const buffer = Buffer.from(arrayBuffer);

			const file = body.get("logo");
			fullFileType = file.type.split("/")[1].split("+")[0].toLowerCase();

			await s3.putObject({
				Bucket: env.AWS_BUCKET_NAME,
				Key: `skill_images/${jsonBody.name}.${fullFileType}`,
				Body: buffer,
				ContentType: file.type,
			}).promise();
		}

		const skill = new Skill(jsonBody);
		if (arrayBuffer.byteLength > 0) {
			skill.logo = `${AWS_PREFIX}skill_images/${jsonBody.name}.${fullFileType}`;
		}

		const data = await skill.save();


		return json(`Created new skill in database: ${data} `);
	} catch (error) {
		throw error;
	}
};
