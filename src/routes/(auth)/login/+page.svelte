<script>
	import { Label, Input, Button } from "flowbite-svelte"

	/** @type {import('./$types').ActionData} */
	export let form
</script>

<div class="flex justify-center items-center h-screen">
	<form method="POST" action="?/login">
		<Label for="username">Username</Label>
		<Input required type="text" name="username" id="username" />

		<Label for="password">Password</Label>
		<Input required type="password" name="password" id="password" />
		{#if form?.incorrect || form?.missing}
			<p class="text-lg text-red-700">Invalid credenetails</p>
		{/if}
		{#if form?.sessionExpired}
			<p class="text-lg text-red-700">Session has expired</p>
		{/if}

		<Button type="submit">Login</Button>
	</form>
</div>
