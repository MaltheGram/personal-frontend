import { Project, validateProject } from "$db/models/projects"
import { json } from "@sveltejs/kit"
import mongoose from "mongoose"

export const GET = async ({ params }) => {
	const findProjectsBySkill = async skillId => {
		skillId = params.id
		try {
			// Ensure skillId is a valid ObjectId
			if (!mongoose.Types.ObjectId.isValid(skillId)) {
				throw new Error("Invalid Skill ID")
			}

			// Convert skillId to a mongoose ObjectId
			const skillObjectId = new mongoose.Types.ObjectId(skillId)

			const projects = await Project.aggregate([
				{
					$match: {
						skillsUsed: skillObjectId
					}
				},
				{
					$lookup: {
						from: "skills",
						localField: "skillsUsed",
						foreignField: "_id",
						as: "skillsDetails"
					}
				},
				{
					$project: {
						name: 1,
						description: 1,
						url: 1,
						skillsDetails: 1
					}
				}
			])
			return projects
		} catch (error) {
			console.error("Error finding projects by skill:", error)
			throw error
		}
	}

	const projects = await findProjectsBySkill(params.id)
	const headers = {
		"Cache-Control": "max-age=0, s-max-age=3600"
	}

	// TOOD: Setup cache headers properly
	return new Response(JSON.stringify(projects), { headers })
}