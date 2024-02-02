import Joi from "joi"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		role: String
	},
	{
		versionKey: false,
		timestamps: true
	}
)

export const validateUser = user => {
	const schema = Joi.object({
		username: Joi.string().required().min(3).max(255),
		password: Joi.string().required().max(255),
		role: Joi.string().valid("admin", "user")
	})
	return schema.validate(user)
}

export const User = mongoose.models.User || mongoose.model("User", userSchema)
