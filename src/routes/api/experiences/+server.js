import { Experience, validateExperience, getExperienceWithSkills } from "$db/models/experience";

import { json } from "@sveltejs/kit"
import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY

export const GET = async ({ }) => {
    let data = await getExperienceWithSkills()

    data.forEach((experience) => {
        if (experience.startDate) {
            experience.startDate = experience.startDate.charAt(0).toUpperCase() + experience.startDate.slice(1);
        }
        if (experience.endDate) {
            experience.endDate = experience.endDate.charAt(0).toUpperCase() + experience.endDate.slice(1);
        }
    });
    const sortExperiencesByStartDate = data => {
        const getDateFromString = (dateStr) => {
            const [month, year] = dateStr?.split(' ');
            return new Date(`${month} 1, ${year}`);
        };

        return data.sort((a, b) => {
            const dateA = getDateFromString(a.startDate);
            const dateB = getDateFromString(b.startDate);
            return dateA - dateB;
        });
    }

    data = sortExperiencesByStartDate(data);
    return json(data, {})
}

export const POST = async ({ request }) => {
    if (request.headers.get("Authorization") !== API_KEY)
        return json(
            { error: "You are not authorized to perform this action" },
            {
                status: 403
            }
        )

    const body = await request.json()

    Object.entries(body).forEach(([key, value]) => {
        if (value === "") {
            delete body[key]
        }
    })

    const { error } = await validateExperience(body)


    if (error)
        return json(
            {
                error: error
            },
            {
                status: 400
            }
        )

    if (body.company && body.school) {
        return json(
            {
                error: "You must provide either only a company or only a school"
            },
            {
                status: 400
            }
        )
    }


    const experience = new Experience(body)
    const data = await experience.save()
    return json({ message: "Created new experience in database", data: data })
}
