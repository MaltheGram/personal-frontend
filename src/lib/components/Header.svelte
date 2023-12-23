<script>
	import { Button, Dropdown, DropdownItem } from "flowbite-svelte"
	const btnColor = "light"
</script>

<nav class="header">
	<Button color={btnColor} pill href="/">Home</Button>
	<Button color={btnColor} pill>Tech stack</Button>
	<Dropdown>
		<DropdownItem href="/skills#Frontend">Frontend</DropdownItem>
		<DropdownItem href="/skills#Backend">Backend</DropdownItem>
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
