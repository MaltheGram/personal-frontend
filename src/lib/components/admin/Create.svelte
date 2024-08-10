<script>
	import { Label, Input, Button } from "flowbite-svelte"
	import { enhance } from "$app/forms"
	export let type

	export let skills = []
	import { skillTypes } from "$lib/stores.js"
	let selected = []
	const clearSelected = () => {
		selected = []
	}
</script>

<div class="mt-10">
	<form on:submit={clearSelected} action="?/{type}" use:enhance method="POST">
		<Input type="hidden" name="create" value={true} />

		{#if type === "skill"}
			<Label for="name">Name</Label>
			<Input type="text" name="name" />

			<Label for="skillType">Type</Label>
			<select name="skillType" class="mt-5 mb-5">
				<option hidden value="">Choose type</option>
				{#each $skillTypes as skillType}
					<option value={skillType}>{skillType}</option>
				{/each}
			</select>

			<Label for="logo">Image</Label>
			<Input accept="image/svg" type="file" name="logo" />
		{/if}

		{#if type === "project"}
			<Label for="name">Name</Label>
			<Input type="text" name="name" />

			<Label for="description">Description</Label>
			<Input type="text" name="description" />

			<Label for="url">Link</Label>
			<Input type="text" name="url" />

			<div class="mt-4">
				<label
					for="skills"
					class="block text-lg font-semibold text-gray-700 mb-3">Skills</label
				>
				<div class="grid grid-cols-2 gap-4">
					{#each skills as skill}
						<div class="flex items-center">
							<input
								id={`skill-${skill.id}`}
								name="skills"
								type="checkbox"
								value={skill.id}
								class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
							/>
							<label
								for={`skill-${skill.id}`}
								class="ml-3 text-sm font-medium text-gray-900"
								>{skill.name}</label
							>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		{#if type === "experience"}
			<Label for="company">Company</Label>
			<Input type="text" name="company" />

			<Label for="school">School</Label>
			<Input type="text" name="school" />

			<Label for="title">Title</Label>
			<Input required type="text" name="title" />

			<Label for="startDate">Start Date (Month Year)</Label>
			<Input required placeholder="january 2023" type="text" name="startDate" />

			<Label for="endDate">End (Month Year)</Label>
			<Input required placeholder="june 2023" type="text" name="endDate" />

			<Label for="description">Description</Label>
			<Input required type="text" name="description" />

			<div class="mt-4">
				<label
					for="skills"
					class="block text-lg font-semibold text-gray-700 mb-3">Skills</label
				>
				<div class="grid grid-cols-2 gap-4">
					{#each skills as skill}
						<div class="flex items-center">
							<input
								id={`skill-${skill.id}`}
								name="skills"
								type="checkbox"
								value={skill.id}
								class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
							/>
							<label
								for={`skill-${skill.id}`}
								class="ml-3 text-sm font-medium text-gray-900"
								>{skill.name}</label
							>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<div class="mt-5 mb-5">
			<Button type="submit" color="primary">Create new {type}</Button>
		</div>
	</form>
</div>
