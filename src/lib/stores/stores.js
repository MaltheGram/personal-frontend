import { readable } from "svelte/store"
import { PUBLIC_API_URL } from "$env/static/public"

export const baseUrl = readable(PUBLIC_API_URL)
