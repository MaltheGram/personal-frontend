<script>
	import LevelDot from "$lib/components/LevelDot.svelte"
	import { Card, Button, Modal, Hr, Search, Toast } from "flowbite-svelte"
	import { slide } from "svelte/transition"
	import { InfoCircleSolid } from "flowbite-svelte-icons"
	import SkillPicker from "./SkillPicker.svelte"

	export let data

	let skills = data.skills
	let numberOfSkillTypes = new Set()
	skills.forEach(skill => numberOfSkillTypes.add(skill.type))

	let project = {}
	let clickOutsideModal = false

	const getProjectDataBySkill = async skillId => {
		const response = await fetch(`api/projects/skill/${skillId}`)
		if (response.ok) {
			const data = await response.json()
			project = data
		} else {
			console.error("Failed to fetch projects", response.status)
		}
		clickOutsideModal = true
	}

	let searchValue = ""
	let displayToast = false
	const scrollIntoSkillView = () => {
		searchValue = searchValue.replace(" ", "").toLowerCase()
		const el = document.querySelector(`#${searchValue}`)
		if (!el) {
			displayToast = true
			setTimeout(() => {
				displayToast = false
				searchValue = ""
			}, 5000)
			return
		}
		el.scrollIntoView({
			behavior: "smooth"
		})
		searchValue = ""
	}
	let skillPickerOpen = true

	const reset = () => {
		skills = data.skills
	}
	const filterByPicks = e => {
		skills = skills.filter(skill => {
			const skillName = skill.name.replace(/\s/g, "")
			return e.detail.some(partialName => skillName.includes(partialName))
		})
	}
</script>

<div class="p-6 rounded-lg shadow-lg">
	<h2 class="text-2xl font-bold mb-4 text-gray-800">Tech Stack</h2>
	<div>
		<p class="mb-4">
			Here you can find a list of technologies I have worked with. I have
			indicated my level of experience with each technology.
		</p>
		{#if displayToast}
			<div class="flex gap-10">
				<Toast color="red" transition={slide} dismissable={false}>
					<InfoCircleSolid slot="icon" class="w-4 h-4" />
					Sadly, {searchValue} is not part of my tech stack.
				</Toast>
			</div>
		{/if}

		<form on:submit|preventDefault={scrollIntoSkillView}>
			<Search
				class="mb-4"
				bind:value={searchValue}
				placeholder="Looking for a particular skill?"
			>
				<Button type="submit" class="mr-3 shadow-s">Search</Button>
			</Search>
		</form>

		<div class="mb-10">
			<h2 class="text-2xl">Looking for a particular skill set?</h2>
			<p>Let's see if match I you!</p>
			<Button size="xl" on:click={() => (skillPickerOpen = !skillPickerOpen)}
				>Skill Picker</Button
			>
			{#if skillPickerOpen}
				<SkillPicker on:reset={reset} on:skillPicker={filterByPicks} />
			{/if}
		</div>
	</div>

	<div class="grid s:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
		{#each numberOfSkillTypes as type}
			<div class="p-4 bg-white rounded-lg shadow-md content-center">
				<h1 class="text-3xl mb-5" id={type}>{type}</h1>
				{#each skills as skill, i (skill._id)}
					{#if skill.type === type}
						<Card
							id={skill.name.replace(" ", "").toLowerCase()}
							img={skill.logo}
							padding="xl"
							horizontal
							class="skill-card mb-5  shadow-2xl shadow-orange-300"
						>
							<div>
								<h2 class="capitalize">{skill.name}</h2>
								<p>{skill.type}</p>
								<LevelDot {skill} />
								<Button
									on:click={() => getProjectDataBySkill(skill._id)}
									class="w-fit">Related projects</Button
								>
							</div>

							<Modal
								title={project.length > 0
									? "Projects"
									: "Sorry, I have no avaliable projects to show off."}
								bind:open={clickOutsideModal}
								autoclose
								outsideclose
							>
								<svelte:fragment>
									{#if project.length > 0}
										<h2 class="text-lg font-bold">
											This technology is used in the following projects:
										</h2>
										<ul>
											{#each project as project}
												<li>
													Github:
													<a href={project.url} target="_blank"
														>{project.name}</a
													>
												</li>
												<li>
													Website:
													<a href="/projects/{project.name}">{project.name}</a>
												</li>
												<Hr />
											{/each}
										</ul>
									{/if}
								</svelte:fragment>
							</Modal>
						</Card>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.skill-card {
		height: 10rem;
		margin: 2.2em 0 0 0;
		box-sizing: border-box;
		&:last-child {
			margin-bottom: 50px;
		}
	}
</style>
