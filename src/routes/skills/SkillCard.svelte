<script>
	import { createEventDispatcher } from "svelte"
	import { Button } from "flowbite-svelte"
	export let skill

	const dispatch = createEventDispatcher()
</script>

<div class="card bg-white" id={skill.name}>
	<h1 class="title">{skill.name}</h1>
	<p>{skill.type}</p>
	<img src={skill.logo} alt={skill.id} />

	<Button
		class="mt-4"
		on:click={() => {
			dispatch("openModal")
		}}>Related Projects</Button
	>
</div>

<style lang="scss">
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		border-radius: 1rem;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		transition: 0.3s;
		margin: 1.5rem auto;
		max-width: 50%;

		&:hover {
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
			scale: 1.05;
		}

		img {
			width: 50%;
			height: 100%;
		}

		.title {
			text-transform: capitalize;
			font-size: 1.5rem;
		}
	}
</style>
