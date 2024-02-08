<script>
	import { Button, Modal, Hr, Search, Toast } from "flowbite-svelte"
	import Card from "$lib/components/Card.svelte"

	export let data

	let skills = data.skills
	let numberOfSkillTypes = new Set()
	skills.forEach(skill => numberOfSkillTypes.add(skill.type))

	let project = {}
	let showModal = false

	const getProjectDataBySkill = async skillId => {
		showModal = true
		const response = await fetch(`api/projects/skill/${skillId}`)
		if (response.ok) {
			const data = await response.json()
			project = data
		} else {
			console.error("Failed to fetch projects", response.status)
		}
	}
</script>

<div
	class="grid s:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center"
>
	{#each numberOfSkillTypes as type}
		<div class="p-4 rounded-lg shadow-md align-center text-center">
			<h1 class="text-3xl mb-5" id={type}>{type}</h1>
			{#each skills as skill, i (skill._id)}
				{#if skill.type === type}
					<Card
						{skill}
						on:openModal={() => {
							getProjectDataBySkill(skill._id)
						}}
					></Card>
					<Modal
						title={project.length > 0
							? "Projects"
							: "Sorry, I have no available projects to show off."}
						bind:open={showModal}
						outsideclose
					>
						<svelte:fragment>
							{#if project.length > 0}
								<h2 class="text-lg font-bold">
									This technology is used in the following projects:
								</h2>
								<ul>
									{#each project as project}
										<li class="list-item">
											Github:
											<a href={project.url} target="_blank">{project.name}</a>
										</li>
										<li class="list-item">
											Portfolio:
											<a href="/projects/{project.name}">{project.name}</a>
										</li>
										<Hr />
									{/each}
								</ul>
							{/if}
						</svelte:fragment>
					</Modal>
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.list-item {
		a {
			color: #000;
			text-decoration: underline;

			&:hover {
				color: blue;
			}
			&:active {
				color: red;
			}
		}
	}
</style>
