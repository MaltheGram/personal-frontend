/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
	const response = await fetch("api/skills")
	const data = await response.json()

	return {
		skills: data
	}
}
