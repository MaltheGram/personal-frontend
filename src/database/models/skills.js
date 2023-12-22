import mongoose from "mongoose"
import Joi from "joi"

const skillSchema = new mongoose.Schema(
	{
		name: String,
		level: Number,
		logo: String,
		type: String
	},
	{
		versionKey: false,
		timestamps: true
	}
)
export const validateSkill = skill => {
	const schema = Joi.object({
		name: Joi.string().required().pattern(new RegExp("^[A-Za-z\\s]+$")),
		level: Joi.number().required().min(0).max(5),
		logo: Joi.string().optional(),
		type: Joi.string()
			.valid("Cloud", "World", "Database", "Backend", "Frontend", "Deployment")
			.optional()
	})
	return schema.validate(skill)
}

export const Skill =
	mongoose.models.Skill || mongoose.model("Skill", skillSchema)
