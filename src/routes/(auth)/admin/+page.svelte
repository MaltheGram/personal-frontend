<script>
	export let data
	import { ButtonGroup, Button, Hr } from "flowbite-svelte"
	import Create from "$lib/components/admin/Create.svelte"
	import Delete from "$lib/components/admin/Delete.svelte"
	import Edit from "$lib/components/admin/Edit.svelte"

	/** @type {import('./$types').ActionData} */
	export let form

	let actionType = "" // Possible values: "", "create", "delete", "edit"
	let itemType = "" // Possible values: "", "skill", "project", "experience"
	let displayAction = false

	const handleAction = (action, type) => {
		actionType = action
		itemType = type
		displayAction = true
	}
</script>

<div class="container">
	<h1>Welcome to the Admin page {data?.user?.username}</h1>
	<Hr />
	<div class="handlers">
		<div class="skill-handler">
			<h3>Skills</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						handleAction("create", "skill")
					}}
					shadow="true">Create skill</Button
				>
				<Button
					on:click={() => {
						handleAction("edit", "skill")
					}}
					shadow="true">Edit skill</Button
				>
				<Button
					on:click={() => {
						handleAction("delete", "skill")
					}}
					shadow="true">Delete skill</Button
				>
			</ButtonGroup>
		</div>
		<div class="project-handler">
			<h3>Projects</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						handleAction("create", "project")
					}}
					shadow="true">Create project</Button
				>
				<Button
					on:click={() => {
						handleAction("edit", "project")
					}}
					shadow="true">Edit project</Button
				>
				<Button
					on:click={() => {
						handleAction("delete", "project")
					}}
					shadow="true">Delete project</Button
				>
			</ButtonGroup>
		</div>
		<div class="experience-handler">
			<h3>Experience</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						handleAction("create", "experience")
					}}
					shadow="true">Create experience</Button
				>
				<Button
					on:click={() => {
						handleAction("edit", "experience")
					}}
					shadow="true">Edit experience</Button
				>
				<Button
					on:click={() => {
						handleAction("delete", "experience")
					}}
					shadow="true">Delete experience</Button
				>
			</ButtonGroup>
		</div>
	</div>
	<div id="action-container">
		{#if displayAction}
			{#if actionType === "create"}
				<Create skills={data.skills} type={itemType} />
			{:else if actionType === "delete"}
				<Delete
					{form}
					skills={data.skills}
					projects={data.projects}
					experiences={data.experiences}
					type={itemType}
				/>
			{:else if actionType === "edit"}
				<Edit
					{form}
					skills={data.skills}
					projects={data.projects}
					experiences={data.experiences}
					type={itemType}
				/>
			{/if}
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
		margin: 0 auto;
		padding: 0 15px;

		h1 {
			margin-top: 2.5rem;
			margin-bottom: 2.5rem;
			font-size: 2.5rem;
		}

		.handlers {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			width: 100%;
			gap: 20px;

			@media (max-width: 640px) {
				flex-direction: column;
			}

			.skill-handler,
			.project-handler,
			.experience-handler {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1 0 calc(33.333% - 20px); // Adjust the percentage as needed
				margin: 1rem 0;

				h3 {
					margin: 1rem 0;
					font-size: 1.5rem;
					font-weight: 700;
				}
			}
		}
	}
</style>
