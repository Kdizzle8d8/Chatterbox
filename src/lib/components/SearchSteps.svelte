<!-- @migration-task Error while migrating Svelte code: This type of directive is not valid on components -->
<script lang="ts">
	import Search from 'lucide-svelte/icons/search';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Citations from './Citations.svelte';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	interface Citation {
		title: string;
		url: string;
	}

	interface SearchStep {
		step: string;
		queries: string[];
		citations: Citation[];
	}

	let { steps } = $props<{
		steps: SearchStep[];
	}>();

	// Track open state for each step
	let openStates = $state(new Array(steps.length).fill(true));

	function toggleStep(index: number) {
		openStates[index] = !openStates[index];
		openStates = openStates; // trigger reactivity
	}
</script>

{#if steps.length > 0}
	<div class="rounded-lg border bg-muted/30 p-4">
		<h3 class=" font-semibold">Deep Search Analysis</h3>
		<Separator class="my-4"></Separator>
		<div class="flex flex-col gap-4">
			{#each steps as { step, queries, citations }, i}
				<Collapsible.Root open={openStates[i]}>
					<div class="flex flex-col gap-2">
						<Collapsible.Trigger>
							<Button
								variant="ghost"
								class="w-full justify-between p-0 px-2 hover:bg-muted/50"
								onclick={() => toggleStep(i)}
							>
								<div class="flex items-start gap-3">
									<span
										class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
									>
										{i + 1}
									</span>
									<p class="text-left text-sm font-medium">{step}</p>
								</div>
								<ChevronDown
									class={`duration-[50ms] size-4 transition-transform ${!openStates[i] ? 'rotate-90' : ''}`}
								/>
							</Button>
						</Collapsible.Trigger>

						<Collapsible.Content>
							<div class="ml-9 flex flex-col gap-2 pt-2">
								<div class="flex flex-wrap gap-2">
									{#each queries as query}
										<div
											class="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80"
										>
											<Search class="size-3" />
											<span>{query}</span>
										</div>
									{/each}
								</div>

								<Citations {citations} />
							</div>
						</Collapsible.Content>
					</div>
				</Collapsible.Root>
				{#if i < steps.length - 1}
					<Separator />
				{/if}
			{/each}
		</div>
	</div>
{/if}
