<script>
	import { Label, Input, Button, Textarea } from "flowbite-svelte"
	import { enhance } from "$app/forms"
	import { skillTypes } from "$lib/stores.js"
	export let projects
	export let skills
	export let experiences
	export let type
	export let form
	let project = {}
	let isChecked = []
	let skill = {}
	let experience = {}

	const getProject = async id => {
		project = projects.find(project => project.id === id)
		isChecked = project.skillsUsed
	}
	const getSkill = async id => {
		skill = skills.find(skill => skill.id === id)
	}

	const getExperience = async id => {
		experience = experiences.find(experience => experience.id === id)
		isChecked = experience.associatedSkills
	}
</script>

<div>
	{#if form?.success}
		<p class="text-green-500">Edit was completed.</p>
	{/if}
	{#if form?.error}
		<p class="text-red-500">An error occured</p>
	{/if}
</div>
<div class="mt-10">
	<form method="POST" use:enhance action="?/{type}">
		<Input type="hidden" name="edit" value={true} />
		{#if type === "project"}
			<div>
				<div>
					<Label for="project">Choose project to edit</Label>
					<select
						on:change={({ target }) => getProject(target.value)}
						name="project"
					>
						<option value="">Choose project</option>
						{#each projects as project}
							<option value={project.id}>{project.name}</option>
						{/each}
					</select>
				</div>
				<div>
					<Input type="hidden" name="id" value={project.id} />
					<Label for="name">Name</Label>
					<Input
						type="text"
						placeholder={project.name}
						name="name"
						value={project.name}
					/>

					<Label for="description">Description</Label>
					<Textarea
						type="text"
						placeholder={project.description}
						name="description"
						value={project.description}
					/>

					<Label for="url">Link</Label>
					<Input
						type="text"
						placeholder={project.url}
						name="url"
						value={project.url}
					/>

					<div class="mt-4">
						<label
							for="skills"
							class="block text-lg font-semibold text-gray-700 mb-3"
							>Skills</label
						>
						<div class="grid grid-cols-2 gap-4">
							{#each skills as skill}
								<div class="flex items-center">
									<input
										id={`skill-${skill.id}`}
										name="skills"
										type="checkbox"
										checked={isChecked.includes(skill.id) ? true : false}
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
				</div>
			</div>
		{/if}
		{#if type === "skill"}
			<div>Edit Skill</div>

			<div>
				<Label for="project">Choose skill to edit</Label>
				<select
					on:change={({ target }) => getSkill(target.value)}
					name="project"
				>
					<option hidden value="">Choose skill</option>
					{#each skills as skill}
						<option value={skill.id}>{skill.name}</option>
					{/each}
				</select>
			</div>
			<Label for="name">Name</Label>
			<div>
				<Input type="hidden" name="id" value={skill.id} />

				<Input
					type="text"
					placeholder={skill.name}
					name="name"
					value={skill.name}
				/>

				<Label for="level">Level</Label>
				<Input
					type="number"
					min="0"
					max="5"
					placeholder={skill.level}
					name="level"
					value={skill.level}
				/>

				<Label for="logo">Logo</Label>
				<Input type="file" name="logo" accept="image/svg" />

				<Label for="skillType">Type</Label>
				<select required name="skillType" class="mt-5 mb-5">
					<option hidden value="">Choose type</option>
					{#each $skillTypes as skillType}
						<option
							selected={skill.skillType === skillType ? true : false}
							value={skillType}>{skillType}</option
						>
					{/each}
				</select>
			</div>
		{/if}
		{#if type === "experience"}
			<div>Edit Experience</div>

			<div>
				<Label for="project">Choose experience to edit</Label>
				<select
					on:change={({ target }) => getExperience(target.value)}
					name="project"
				>
					<option hidden value="">Choose experience</option>
					{#each experiences as experience}
						<option value={experience.id}>{experience.title}</option>
					{/each}
				</select>
			</div>
			<Input type="hidden" name="id" value={experience.id} />

			<Label for="title">Title</Label>
			<Input
				type="text"
				placeholder={experience.title}
				name="title"
				value={experience.title}
			/>

			<Label for="description">Description</Label>
			<Textarea
				rows="5"
				cols="33"
				type="text"
				placeholder={experience.description}
				name="description"
				value={experience.description}
			/>

			<Label for="startDate">Start Date</Label>
			<Input
				type="text"
				placeholder={experience.startDate}
				name="startDate"
				value={experience.startDate}
			/>

			<Label for="endDate">End Date</Label>
			<Input
				type="text"
				placeholder={experience.endDate}
				name="endDate"
				value={experience.endDate}
			/>

			<Label for="company">Company</Label>
			<Input
				type="text"
				placeholder={experience?.company}
				name="company"
				value={experience?.company}
			/>

			<Label for="school">School</Label>
			<Input
				type="text"
				placeholder={experience?.school}
				name="school"
				value={experience?.school}
			/>

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
								checked={isChecked.includes(skill.id) ? true : false}
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
		<Button class="mt-5 mb-5" type="submit" shadow="true">Edit {type}</Button>
	</form>
</div>
