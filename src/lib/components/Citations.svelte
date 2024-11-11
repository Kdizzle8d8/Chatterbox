<script lang="ts">
	import Globe from 'lucide-svelte/icons/globe';

	interface Citation {
		title: string;
		url: string;
	}

	let { citations } = $props<{
		citations: Citation[];
	}>();
</script>

{#if citations.length > 0}
	<div class="flex flex-wrap gap-2">
		{#each citations as citation}
			<a
				href={citation.url}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80"
			>
				<Globe class="size-3" />
				<span>{citation.title}</span>
			</a>
		{/each}
	</div>
{/if}
