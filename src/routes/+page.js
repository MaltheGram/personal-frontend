/** @type {import('./$types').PageLoad} */
export const load = async ({ fetch }) => {
    const response = await fetch("api/experiences")
    const data = await response.json()

    return {
        experiences: data
    }
}
