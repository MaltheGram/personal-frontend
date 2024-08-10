<script>
	import { ArrowBigSolid } from "flowbite-svelte-icons"
	import { Tooltip } from "flowbite-svelte"
	export let title
	export let nextSectionId
	let nextSectionTitle = ""

	import { onMount } from "svelte"

	onMount(() => {
		nextSectionTitle = document
			?.getElementById(nextSectionId)
			?.closest("h1").textContent
	})

	const scrollToSection = () => {
		const section = document.getElementById(nextSectionId)?.closest("section")
		if (!section) return
		section.scrollIntoView({ behavior: "smooth" })
	}
</script>

<div class="flex flex-col items-center text-center mb-5">
	<div class="flex items-center space-x-2">
		<h1 id={title} class="text-3xl">{title}</h1>
		{#if nextSectionTitle}
			<ArrowBigSolid on:click={scrollToSection} class="cursor-pointer" />
			<Tooltip>Next section: {nextSectionTitle}</Tooltip>
		{/if}
	</div>
</div>
