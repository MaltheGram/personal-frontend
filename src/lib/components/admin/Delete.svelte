<script>
	import { enhance } from "$app/forms"
	import { Label, Input, Button } from "flowbite-svelte"
	export let projects = []
	export let skills = []
	export let type
	export let form
</script>

<!-- Cheating and using a POST, since Sveltekit has no proper way of doing this -->
<div class="delete-container">
	<form method="POST" action="?/{type}" use:enhance>
		<Input type="hidden" name="delete" value={true} />

		{#if type === "project"}
			{#each projects as project}
				<div class="project-row">
					<Label for="project">{project.name}</Label>
					<Button class="ml-5" type="submit" name="id" value={project.id}
						>Delete</Button
					>
				</div>
			{/each}
			{#if form?.success}
				<p class="delete-success">Succesfully deleted {form?.projectName}</p>
			{/if}
		{/if}

		{#if type === "skill"}
			{#each skills as skill}
				<div class="project-row">
					<Label for="project">{skill.name}</Label>
					<Button class="ml-5" type="submit" name="id" value={skill.id}
						>Delete</Button
					>
				</div>
			{/each}
			{#if form?.success}
				<p class="delete-success">Succesfully deleted {form?.projectName}</p>
			{/if}
		{/if}
	</form>
</div>

<style lang="scss">
	.delete-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px;
		background-color: #f7f7f7;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 500px;

		form {
			width: 100%;

			.project-row {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				margin: 0.5rem 0;

				@media (max-width: 600px) {
					flex-direction: column;
					align-items: flex-start;
				}
			}

			.delete-success {
				color: #4ade80;
				margin-top: 20px;
				font-weight: bold;
				font-size: 1rem;
				text-align: center;
			}
		}
	}
</style>
