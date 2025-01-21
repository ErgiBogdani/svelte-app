<script>
	let { children } = $props();
	import "../css/bootstrap.min.css"
	import Navbar from '$lib/Navbar.svelte';
</script>

<Navbar />

<div class="container-md p-0 pt-5">
{@render children()}
</div>