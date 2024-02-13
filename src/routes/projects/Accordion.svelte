<script>
	import { AccordionItem, Accordion } from "flowbite-svelte"
	export let project
</script>

<Accordion>
	<AccordionItem>
		<span slot="header">Read more...</span>
		<span>{project.description}</span>
	</AccordionItem>
</Accordion>
