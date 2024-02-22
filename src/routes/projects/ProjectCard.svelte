<script>
	export let project

	import { Listgroup, ListgroupItem, Avatar, Button } from "flowbite-svelte"
	import Accordion from "./Accordion.svelte"
	import LevelDot from "$lib/components/LevelDot.svelte"
	import { createEventDispatcher } from "svelte"

	const dispatch = createEventDispatcher()
	const dispatchFocusProject = () => {
		dispatch("focusProject", project._id)
	}
</script>

<div class="project-details">
	<h1>{project.name}</h1>
	<Accordion {project} />
	<Listgroup class="mt-5" shadow color="dropdown">
		<h2
			class="p-1 text-center text-md font-medium text-gray-900 dark:text-white"
		>
			Skills used
		</h2>
		{#each project.skills as skill}
			<ListgroupItem
				class="flex lg:flex-row md:flex-col items-center overflow-auto"
			>
				<Avatar class="mr-2" src={skill.logo} alt={skill.name} />
				<span class="mr-2 ml-2 lg:mr-3">{skill.name}</span>
				<LevelDot {skill} />
			</ListgroupItem>
		{/each}
	</Listgroup>
	<div class="link">
		{#if project.url}
			<a target="_blank" href={project.url}>View on Github</a>
		{/if}
	</div>
	<div class="text-center mt-5">
		<Button on:click={dispatchFocusProject} role="button">Focus project</Button>
	</div>
</div>

<style lang="scss">
	.project-details {
		h1 {
			text-align: center;
			font-weight: 700;
			font-size: 1.5rem;
			margin: 1rem 0;
		}
		.link {
			display: flex;
			justify-content: center;
			a {
				margin-top: 1rem;
				padding: 0.5rem;

				&:hover {
					background-color: black;

					color: white;
					border-radius: 10px;
				}
			}
		}
	}
</style>
