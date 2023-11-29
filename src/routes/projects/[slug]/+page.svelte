<script>
	import Project from "./Project.svelte"
	export let data

	const project = data.project
</script>

<Project {project} />
