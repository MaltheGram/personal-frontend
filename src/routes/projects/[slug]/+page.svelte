<script>
	import Project from "./Project.svelte"
	export let data

	const project = data.project[0]
</script>

<Project {project} />
