<script>
	import { Label, Input, Button, ButtonGroup, Textarea } from "flowbite-svelte"
	import { EnvelopeSolid } from "flowbite-svelte-icons"
</script>

<form method="POST" action="?/mailer" class="mb-6">
	<Input type="hidden" name="subject" value="New message from portfolio!" />
	<Input required id="name" name="name" type="text" placeholder="Mr. CTO" />
	<Textarea
		required
		class="mt-2"
		name="content"
		id="content"
		placeholder="Hello Malthe! I could be your future employee!"
	></Textarea>
	<Input
		required
		class="mb-2"
		id="email"
		name="email"
		type="email"
		placeholder="CTO@awesome.company.com"
	>
		<EnvelopeSolid
			slot="left"
			class="w-5 h-5 text-gray-500 dark:text-gray-400"
		/>
	</Input>
	<Button type="submit">Reach out!</Button>
</form>
