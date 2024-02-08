<script>
	import { page } from "$app/stores"
	import {
		Label,
		Input,
		Button,
		ButtonGroup,
		Textarea,
		Toast
	} from "flowbite-svelte"
	import { EnvelopeSolid } from "flowbite-svelte-icons"
	import { enhance } from "$app/forms"
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
	<div class="p-4 shadow-lg rounded-lg bg-white max-w-md w-full">
		<form use:enhance method="POST" action="?/mailer" class="mb-6">
			<Input type="hidden" name="subject" value="New message from portfolio!" />
			<div class="mb-4">
				<Input
					required
					id="name"
					name="name"
					type="text"
					placeholder="Mr. CTO"
				/>
			</div>
			<div class="mb-4">
				<Textarea
					required
					class="mt-2"
					name="content"
					id="content"
					placeholder="Hello Malthe! I could be your future boss!"
				></Textarea>
			</div>
			<div class="mb-4">
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
			</div>
			<div class="flex justify-center">
				<Button type="submit">Reach out!</Button>
			</div>
		</form>
		<div class="flex items-center text-xs">
			<span>Or mail me directly!</span>
			<a
				href="mailto:malthegram22@gmail.com"
				class="inline-flex items-center ml-2"
			>
				<EnvelopeSolid class="w-5 h-5 text-gray-500 dark:text-gray-400" />
			</a>
		</div>
	</div>
</div>
