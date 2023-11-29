import { baseUrl } from "$lib/stores/stores.js"

/** @type {import('./$types').PageLoad} */

export const load = async ({ params, fetch }) => {
	let urlValue

	const unsubscribe = baseUrl.subscribe(value => {
		urlValue = value
	})
	unsubscribe()

	const response = await fetch(`${urlValue}/api/projects`)
	const data = await response.json()

	return {
		projects: data.Data
	}
}
