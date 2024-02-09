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
	import { fade } from "svelte/transition"
	import { quintOut } from "svelte/easing"
	import { EnvelopeSolid, PapperPlaneOutline } from "flowbite-svelte-icons"
	import { enhance } from "$app/forms"

	export let form
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-100">
	<div class="p-4 shadow-lg rounded-lg bg-white max-w-md w-full">
		<form use:enhance method="POST" action="?/mailer" class="mb-6">
			{#if form?.success}
				<Toast
					transition={fade}
					params={{ delay: 250, duration: 300, easing: quintOut }}
					dismissable={true}
					type="success"
					contentClass="flex space-x-4 rtl:space-x-reverse divide-x rtl:divide-x-reverse divide-gray-200 dark:divide-gray-700"
				>
					<PapperPlaneOutline
						class="w-5 h-5 text-primary-600 dark:text-primary-500 rotate-45"
					/>
					<div class="ps-4 text-sm font-normal">Message sent successfully.</div>
				</Toast>
			{/if}
			{#if form?.missing || form?.error}
				<Toast
					transition={fade}
					params={{ delay: 250, duration: 300, easing: quintOut }}
					dismissable={false}
					class="mt-4"
					type="error"
				>
					<div class="ps-4 text-primary-600 text-sm font-normal">
						An error occured. Please try again.
					</div>
				</Toast>
			{/if}
			<Input
				type="hidden"
				name="headline"
				value="New message from portfolio!"
			/>
			<div class="mb-4">
				<Input required id="name" name="name" type="text" placeholder="Name" />
			</div>
			<div class="mb-4">
				<Input id="name" name="subject" type="text" placeholder="Subject" />
			</div>
			<div class="mb-4">
				<Textarea
					required
					class="mt-2"
					name="content"
					id="content"
					placeholder="Message"
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
