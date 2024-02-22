<script>
	import { Label, Input, Button, Checkbox, MultiSelect } from "flowbite-svelte"
	import { enhance } from "$app/forms"
	export let type

	export let skills = []
	let selected = []
	const clearSelected = () => {
		selected = []
	}
</script>

<div class="mt-10">
	<form on:submit={clearSelected} action="?/{type}" use:enhance method="POST">
		<Input type="hidden" name="create" value={true} />
		{#if type === "user"}
			<Label for="username">Username</Label>
			<Input type="text" name="username" />

			<Label for="password">Password</Label>
			<Input type="password" name="password" />

			<Label for="role">Will this user be admin?</Label>
			<Checkbox type="checkbox" name="role" />
		{/if}

		{#if type === "skill"}
			<Label for="skill">Name</Label>
			<Input type="text" name="skill" />

			<Label for="level">Level</Label>
			<Input type="number" name="level" />

			<Label for="description">Description</Label>
			<Input type="text" name="description" />

			<Label for="image">Image</Label>
			<Input type="file" name="image" />
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
		<div class="mt-5">
			<Button type="submit" color="primary">Create new {type}</Button>
		</div>
	</form>
</div>
