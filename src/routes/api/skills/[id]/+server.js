import { Skill, validateSkill } from "$db/models/skills"
import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
import AWS from "aws-sdk";
const API_KEY = env.API_KEY

const s3 = new AWS.S3({
	accessKeyId: env.AWS_ACCESS_KEY_ID,
	secretAccessKey: env.AWS_SECRET_ACCESS_KEY
})

export const GET = async ({ params }) => {
	let data
	Number(params.id)
		? (data = await Skill.find({ _id: params.id }))
		: (data = await Skill.find({ name: params.id }));

	if (data.length === 0) {
		return json({ error: `Skill with id or name ${params.id} not found` }, { status: 404 });
	}

	return json(data, {
		status: 200,
	});
}

export const PUT = async ({ params, request }) => {
	try {
		if (request.headers.get("Authorization") !== API_KEY) {
			return json({ error: "You are not authorized to perform this action" }, { status: 403 });
		}

		const id = params.id;
		const body = await request.formData();
		const jsonBody = {
			name: body.get("name"),
			type: body.get("skillType"),
			level: body.get("level"),
		};
		jsonBody.level = Number(jsonBody.level);

		const { error } = await validateSkill(jsonBody);
		if (error) {
			console.error("error", error);
			return json({
				error: error.details[0].message,
				Notices: "Please ensure values are spelled correctly. Be aware of white space."
			}, { status: 400 });
		}

		Object.keys(jsonBody).forEach(key => {
			if (typeof jsonBody[key] === "string") {
				jsonBody[key] = jsonBody[key].toLowerCase();
			}
		});

		const skill = await Skill.findById(id);
		if (!skill) {
			return json({ error: "Skill not found" }, { status: 404 });
		}
		const skillLogo = skill.logo;
		let fullFileType;
		const file = body.get("logo");
		const arrayBuffer = await file.arrayBuffer();

		if (arrayBuffer.byteLength > 0) {
			const buffer = Buffer.from(arrayBuffer);
			fullFileType = file.type.split("/")[1].split("+")[0].toLowerCase();

			if (skillLogo) {
				const key = skillLogo.split(env.AWS_PREFIX)[1];
				await s3.deleteObject({
					Bucket: env.AWS_BUCKET_NAME,
					Key: key,
				}).promise();
			}

			await s3.putObject({
				Bucket: env.AWS_BUCKET_NAME,
				Key: `skill_images/${jsonBody.name}.${fullFileType}`,
				Body: buffer,
				ContentType: file.type,
			}).promise();

			Skill.findByIdAndUpdate(id, {
				...jsonBody,
				logo: `${env.AWS_PREFIX}skill_images/${jsonBody.name}.${fullFileType}`
			});

			return json({ message: "Skill updated successfully" }, { status: 200 });
		} else {
			return json({ message: "Skill updated without logo change" }, { status: 200 });
		}
	} catch (error) {
		console.error("error", error);
		return json({ error: error.message || "An error occurred" }, { status: 500 });
	}
};

export const DELETE = async ({ params, request }) => {
	if (request.headers.get("Authorization") !== API_KEY)
		return json(
			{ error: "You are not authorized to perform this action" },
			{
				status: 403
			}
		);


	try {
		const id = params.id;
		const skill = await Skill.findById(id)
		const skillLogo = skill.logo;

		if (skillLogo) {
			const key = skillLogo.split(env.AWS_PREFIX)[1];

			await s3.deleteObject({
				Bucket: env.AWS_BUCKET_NAME,
				Key: key
			}).promise();
		}

		const skillDeleted = await skill.deleteOne();

		if (skillDeleted.deleteCount === 0) {
			return json(
				{ error: `Skill with id ${id} does not exist` },
				{
					status: 404
				}
			);
		} else {
			return json(`Deleted skill from database: ${JSON.stringify(id)}`, {
				status: 200
			});
		}
	} catch (error) {
		throw error;

	};
}
