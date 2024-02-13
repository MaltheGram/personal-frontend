<script>
	export let data
	const projects = data.projects
	import ProjectCard from "./ProjectCard.svelte"

	let focusedProjectId = null

	function focusProject(event) {
		const projectId = event.detail
		focusedProjectId = focusedProjectId === projectId ? null : projectId
	}
</script>

<div class="project-container">
	{#each projects as project (project._id)}
		<div
			class:blur={focusedProjectId !== null && project._id !== focusedProjectId}
			class="project-card"
		>
			<ProjectCard {project} on:focusProject={focusProject} />
		</div>
	{/each}
</div>

<style lang="scss">
	.blur {
		filter: blur(10px);
		pointer-events: none;
	}
	.project-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 3.5em;
		padding: 2.2rem;

		.project-card {
			background-color: #ffffff;
			padding: 1.5rem;
			border-radius: 1rem;
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
			transition: transform 0.3s;
			text-transform: capitalize;

			&:hover {
				transform: scale(1.05);
			}
		}
	}
</style>
