import mongoose from "mongoose"
import Joi from "joi"

const sessionSchema = new mongoose.Schema(
	{
		sessionUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		sessionId: String,
		expires: Date
	},
	{
		versionKey: false,
		timestamps: true
	}
)
export const Session =
	mongoose.models.Session || mongoose.model("Session", sessionSchema)
