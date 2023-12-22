/** @type {import('./$types').PageLoad} */

export const load = async ({ fetch, params }) => {
	const response = await fetch(`/api/projects/${params.slug}`)
	const data = await response.json()

	return {
		project: data
	}
}
