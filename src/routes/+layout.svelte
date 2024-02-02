<script>
	import "../app.pcss"
	import "../app.pcss"
	import Header from "$lib/components/Header.svelte"
	import Footer from "$lib/components/Footer.svelte"
</script>

<div>
	<Header></Header>
	<main class="flex flex-col min-h-screen">
		<slot />
	</main>
	<Footer class="fixed bottom-0 w-full h-auto"></Footer>
</div>
