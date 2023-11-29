import { baseUrl } from "$lib/stores/stores.js"
import { error } from "@sveltejs/kit"

/** @type {import('./$types').PageLoad} */

export const load = async ({ fetch, params }) => {
	let urlValue

	const unsubscribe = baseUrl.subscribe(value => {
		urlValue = value
	})
	unsubscribe()

	const response = await fetch(`${urlValue}/api/projects/${params.slug}`)
	const data = await response.json()
	console.log(data)

	if (!data.Data.length > 0) {
		throw error(404, {
			message: "Project not found"
		})
	}

	return {
		project: data.Data[0]
	}
}
