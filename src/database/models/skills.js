import mongoose from "mongoose"
import Joi from "joi"

const skillSchema = new mongoose.Schema(
	{
		name: String,
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
		name: Joi.string().required().min(3).max(255),
		logo: Joi.string().optional(),
		type: Joi.string().valid(
			"Cloud",
			"Database",
			"Backend",
			"Frontend",
			"Deployment"
		)
	})
	return schema.validate(skill)
}

export const Skill =
	mongoose.models.Skill || mongoose.model("Skill", skillSchema)
