import { env } from "$env/dynamic/private"
const API_KEY = env.API_KEY
import { Experience } from "$db/models/experience"
import { json } from "@sveltejs/kit"

export const GET = async ({ params }) => {
    const experienceName = params.id
    const experience = await Experience.findOne({ name: experienceName })
    if (!experience) {
        return json(
            { error: `Experience with name ${experienceName} does not exist` },
            {
                status: 404
            }
        )
    } else {
        return json(experience, {})
    }
}

export const PUT = async ({ request, params }) => {
    if (request.headers.get("Authorization") !== API_KEY)
        return json(
            { error: "You are not authorized to perform this action" },
            {
                status: 403
            }
        )

    const id = params.id
    const data = await request.json()
    const experience = await Experience.findByIdAndUpdate(id, data, {
        new: true,
        useFindAndModify: false
    })

    if (!experience) {
        return json(
            { error: `Experience with id ${id} does not exist` },
            {
                status: 404
            }
        )
    } else {
        return json(experience, {})
    }

}

export const DELETE = async ({ request, params }) => {
    if (request.headers.get("Authorization") !== API_KEY)
        return json(
            { error: "You are not authorized to perform this action" },
            {
                status: 403
            }
        )

    const id = params.id
    const experience = await Experience.deleteOne({ _id: id })
    if (!experience) {
        return json(
            { error: `Experience with id ${id} does not exist` },
            {
                status: 404
            }
        )
    } else {
        return json(`Deleted experience from database: ${JSON.stringify(id)}`, {})
    }

}