<script>
	import {
		Navbar,
		NavBrand,
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

	import { CloseSolid } from "flowbite-svelte-icons"
	$: activeUrl = $page.url.pathname
	let skillSearched = ""

	const searchSkill = async () => {
		const response = await fetch(`/api/skills/${skillSearched}`)
		if (response.ok) {
			goto(`/skills#${skillSearched}`)
			skillSearched = ""
		} else {
			skillSearched = ""
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
			<!-- <DropdownItem href="/skills">Search</DropdownItem> -->
			<DropdownItem>
				<form on:submit|preventDefault={searchSkill} class="flex gap-2">
					<Search
						bind:value={skillSearched}
						placeholder="Search..."
						size="md"
					/>
				</form>
			</DropdownItem>
			<DropdownItem href="/skills#Backend">Backend</DropdownItem>
			<DropdownItem href="/skills#Frontend">Frontend</DropdownItem>
			<DropdownItem href="/skills#Cloud">Cloud</DropdownItem>
			<DropdownItem href="/skills#Database">Database</DropdownItem>
		</Dropdown>
		<NavLi href="/projects">Projects</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>
