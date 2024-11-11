<script lang="ts">
	import '../app.css';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<ModeWatcher></ModeWatcher>

<div class="min-h-screen bg-background text-foreground">
	<ModeToggle />
	{@render children()}
</div>
