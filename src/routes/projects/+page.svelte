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
			class:enlarge={focusedProjectId === project._id}
			class="project-card"
		>
			<ProjectCard {project} on:focusProject={focusProject} />
		</div>
	{/each}
</div>

<style lang="scss">
	.blur {
		filter: blur(15px);
		pointer-events: none;
	}

	.enlarge {
		z-index: 1;
	}

	.project-container {
		display: grid;
		grid-template-columns: repeat(1, minmax(50px, 1fr));
		gap: 3.5em;
		padding: 2.2rem;

		@media screen and (min-width: 768px) {
			// For iPads and tablets
			grid-template-columns: repeat(3, minmax(50px, 1fr)); // 3 columns
		}
		@media screen and (min-width: 1024px) {
			// For laptops and larger devices
			grid-template-columns: repeat(4, minmax(200px, 1fr)); // 4 columns
		}
	}

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
</style>
