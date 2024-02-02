<script>
	import { Button, Input, Listgroup, ListgroupItem } from "flowbite-svelte"
	import { CheckSolid, CloseSolid } from "flowbite-svelte-icons"
	import { createEventDispatcher } from "svelte"
	import Contact from "$lib/components/Contact.svelte"
	const dispatch = createEventDispatcher()
	let selectedSkills = [
		"CSS",
		"HTML",
		"JavaScript",
		"Svelte",
		"TailwindCSS",
		"JAVA",
		"C#",
		"CSS",
		"HTML",
		"JavaScript",
		"Svelte",
		"TailwindCSS",
		"JAVA",
		"C#"
	]
	let skillInput = ""

	const addSkill = () => {
		if (skillInput === "") return
		selectedSkills = [...selectedSkills, skillInput.toLowerCase()]
		skillInput = ""
	}
	const resetSkills = () => {
		selectedSkills = []
	}
</script>

<div class="container mt-5">
	<Input
		placeholder="Fancy Placeholder"
		bind:value={skillInput}
		type="text"
		class="w-200"
	></Input>
	<Button class="mt-3 mb-3" on:click={addSkill}
		>Add skill to search criteria</Button
	>
	<Button
		on:click={() => {
			resetSkills()
			dispatch("reset")
		}}
		color="red">Reset</Button
	>

	{#if selectedSkills.length > 0}
		<Listgroup
			class="grid sm:grid-cols-1 s:grid-cols- md:grid-cols-4 lg:grid-cols-8 gap-2 text-center w-fit capitalize
			"
		>
			{#each selectedSkills as skillItem}
				<ListgroupItem>{skillItem}</ListgroupItem>
			{/each}
		</Listgroup>
		<Button
			on:click={dispatch("skillPicker", selectedSkills)}
			class="mt-3"
			color="green">Are we a match?</Button
		>
	{/if}
	<!-- 	<Contact /> -->
</div>
