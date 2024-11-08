<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-screen text-white  bg-slate-800 h-screen">
	{@render children()}
</div>
