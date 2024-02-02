<script>
	import { Button, Dropdown, DropdownItem, NavHamburger } from "flowbite-svelte"
	import { ChevronDownSolid } from "flowbite-svelte-icons"
	const btnColor = "light"
</script>

<nav class="header">
	<Button color={btnColor} pill href="/">Home</Button>
	<Button color={btnColor} pill>
		Tech stack <ChevronDownSolid size="xs" class="ml-2" /></Button
	>
	<Dropdown>
		<DropdownItem href="/skills">Top of the page</DropdownItem>
		<DropdownItem href="/skills#Backend">Backend</DropdownItem>
		<DropdownItem href="/skills#Frontend">Frontend</DropdownItem>
		<DropdownItem href="/skills#Cloud">Cloud</DropdownItem>
		<DropdownItem href="/skills#Database">Database</DropdownItem>
	</Dropdown>
	<Button color={btnColor} pill href="/projects">Projects</Button>
	<Button color={btnColor} pill href="/about">About me</Button>
</nav>

<style lang="scss">
	.header {
		background-color: #333;
		color: white;
		padding: 10px 20px;
		text-align: right;
	}
</style>
