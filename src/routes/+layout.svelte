<script>
	import "../app.pcss";
    import "../app.pcss";
    import Header from "$lib/components/Header.svelte"
    import Footer from "$lib/components/Footer.svelte"
    import reset from "$lib/reset.css"
    import Device from 'svelte-device-info'

</script>

<Header></Header>
<slot></slot>

<Footer></Footer>


