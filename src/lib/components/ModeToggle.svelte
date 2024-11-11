<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { mode, toggleMode } from 'mode-watcher';
</script>

<Button variant="outline" size="icon" onclick={toggleMode} class="fixed right-4 top-4">
	{#if $mode === 'dark'}
		<Sun class="size-[1.2rem]" />
		<span class="sr-only">Switch to light mode</span>
	{:else}
		<Moon class="size-[1.2rem]" />
		<span class="sr-only">Switch to dark mode</span>
	{/if}
</Button>
