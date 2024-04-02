<script>
	import {
		Navbar,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Search
	} from "flowbite-svelte"
	import { ChevronDownOutline, CloseCircleSolid } from "flowbite-svelte-icons"
	import { page } from "$app/stores"
	import { goto } from "$app/navigation"
	import { skillTypes } from "$lib/stores.js"

	$: activeUrl = $page.url.pathname
	let skillSearched = ""
	let searchPlaceholder = "Search..."

	const searchSkill = async () => {
		const response = await fetch(`/api/skills/${skillSearched}`)
		if (response.status === 200) {
			goto(`/skills#${skillSearched}`)
			skillSearched = ""
			searchPlaceholder = "Search..."
		} else {
			skillSearched = ""
			searchPlaceholder = "Try again!"
		}
	}
</script>

<Navbar color="form">
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/">Home</NavLi>
		<NavLi class="cursor-pointer">
			Skills<ChevronDownOutline
				class="w-3 h-3 ms-2 text-primary-800 dark:text-white inline"
			/>
		</NavLi>

		<Dropdown class="w-44 z-20">
			<DropdownItem>
				<form on:submit|preventDefault={searchSkill} class="flex gap-2">
					<Search
						bind:value={skillSearched}
						placeholder={searchPlaceholder}
						size="md"
					/>
				</form>
			</DropdownItem>
			{#each $skillTypes as skillType}
				<DropdownItem href="/skills#{skillType.toLowerCase()}"
					>{skillType}</DropdownItem
				>
			{/each}
		</Dropdown>
		<NavLi href="/projects">Projects</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>
