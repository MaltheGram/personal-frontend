<script>
	export let data
	import { ButtonGroup, Button, Hr } from "flowbite-svelte"
	import Create from "$lib/components/admin/Create.svelte"

	let creationType = ""
</script>

<div class="container">
	<h1>Welcome to the Admin page {data?.user?.username}</h1>
	<Hr />
	<div class="handlers">
		<div class="user-handler">
			<h3>Users</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						creationType = "user"
					}}
					shadow="true">Create user</Button
				>
				<Button shadow="true">Edit user</Button>
				<Button shadow="true">Delete user</Button>
			</ButtonGroup>
		</div>
		<div class="skill-handler">
			<h3>Skills</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						creationType = "skill"
					}}
					shadow="true">Create skill</Button
				>
				<Button shadow="true">Edit skill</Button>
				<Button shadow="true">Delete skill</Button>
			</ButtonGroup>
		</div>
		<div class="project-handler">
			<h3>Projects</h3>
			<ButtonGroup>
				<Button
					on:click={() => {
						creationType = "project"
					}}
					shadow="true">Create project</Button
				>
				<Button shadow="true">Edit project</Button>
				<Button shadow="true">Delete project</Button>
			</ButtonGroup>
		</div>
	</div>
	<div id="action-container">
		<Create skills={data.skills} type={creationType} />
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

			.user-handler,
			.skill-handler,
			.project-handler {
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
