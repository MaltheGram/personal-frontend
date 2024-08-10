import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid"
import { Skill } from "$db/models/skills";

Joi.objectId = JoiObjectId(Joi)

const experienceSchema = new mongoose.Schema(
    {
        title: String,
        company: String,
        school: String,
        startDate: String,
        endDate: String,
        description: String,
        associatedSkills: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Skill"
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const validateExperience = (experience) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        company: Joi.string().optional().allow(""),
        school: Joi.string().optional().allow(""),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        description: Joi.string().optional().allow(""),
        associatedSkills: Joi.array().items(Joi.objectId().optional().allow("")),
    });
    return schema.validate(experience);
}

export const getExperienceWithSkills = async () => {
    try {
        const experienceWithSkills = await Experience.aggregate([
            {
                $lookup: {
                    from: "skills",
                    localField: "associatedSkills",
                    foreignField: "_id",
                    as: "associatedSkills"
                }
            },
            {
                $project: {
                    title: 1,
                    company: 1,
                    school: 1,
                    startDate: 1,
                    endDate: 1,
                    description: 1,
                    associatedSkills: {
                        name: 1,
                        level: 1,
                        logo: 1,
                        type: 1
                    }
                }
            }
        ])

        return experienceWithSkills

    } catch (error) {
        console.error("Error fetching projects with skills:", error)
        throw error
    }
}

export const Experience =
    mongoose.models.Experience || mongoose.model("Experience", experienceSchema)


