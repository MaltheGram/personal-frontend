import { baseUrl } from "$lib/stores/stores.js"

/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	let urlValue

	const unsubscribe = baseUrl.subscribe(value => {
		urlValue = value
	})
	unsubscribe()


	const response = await fetch(`${urlValue}/api/skills`)
	const data = await response.json()

	return {
		skills: data.Data
	}
}
