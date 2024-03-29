/** @type {import('./$types').PageLoad} */

export const load = async ({ fetch }) => {
	const response = await fetch("api/projects")
	const data = await response.json()

	return {
		projects: data
	}
}
