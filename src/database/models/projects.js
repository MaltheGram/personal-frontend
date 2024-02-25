import Joi from "joi"
import JoiObjectId from "joi-objectid"
import mongoose from "mongoose"

Joi.objectId = JoiObjectId(Joi)

const ProjectSchema = new mongoose.Schema(
	{
		name: String,
		description: String,
		url: String,
		skillsUsed: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Skill"
			}
		]
	},
	{
		versionKey: false,
		timesestamps: true
	}
)

export const validateProject = project => {
	const schema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().optional().allow(""),
		url: Joi.string().optional().allow(""),
		skillsUsed: Joi.array().items(Joi.objectId().required())
	})
	return schema.validate(project)
}
export const getProjectsWithSkills = async () => {
	try {
		const projectsWithSkills = await Project.aggregate([
			{
				$lookup: {
					from: "skills",
					localField: "skillsUsed",
					foreignField: "_id",
					as: "skills"
				}
			},
			{
				$project: {
					name: 1,
					description: 1,
					url: 1,
					skills: {
						name: 1,
						level: 1,
						logo: 1,
						type: 1
					}
				}
			}
		])

		return projectsWithSkills
	} catch (error) {
		console.error("Error fetching projects with skills:", error)
		throw error
	}
}

export const getSingleProjectWithSkills = async (projectName = null) => {
	try {
		const matchStage = projectName ? { $match: { name: projectName } } : {}

		const projectsWithSkills = await Project.aggregate([
			matchStage,
			{
				$lookup: {
					from: "skills",
					localField: "skillsUsed",
					foreignField: "_id",
					as: "skills"
				}
			},
			{
				$project: {
					name: 1,
					description: 1,
					url: 1,
					skills: {
						name: 1,
						level: 1,
						logo: 1,
						type: 1
					}
				}
			}
		])

		return projectsWithSkills
	} catch (error) {
		console.error("Error finding projects with skills:", error)
		throw error
	}
}

export const Project =
	mongoose.models.Project || mongoose.model("Project", ProjectSchema)
