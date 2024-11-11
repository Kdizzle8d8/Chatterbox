<script lang="ts">
	import Citations from './Citations.svelte';
	import SearchSteps from './SearchSteps.svelte';

	interface Citation {
		title: string;
		url: string;
	}

	interface SearchStep {
		step: string;
		queries: string[];
		citations: Citation[];
	}

	let {
		citations = [],
		searchSteps = [],
		children
	} = $props<{
		citations?: Citation[];
		searchSteps?: SearchStep[];
		children: () => any;
	}>();
</script>

<div class="border-b">
	<div class="container mx-auto py-8">
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-2 text-sm text-muted-foreground">
				<span>AI Assistant</span>
				<span>•</span>
				<span>Just now</span>
			</div>

			<SearchSteps steps={searchSteps} />
			<Citations {citations} />

			<div class="prose prose-neutral dark:prose-invert max-w-none">
				{@render children()}
			</div>
		</div>
	</div>
</div>
