<script lang="ts">
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Mic from 'lucide-svelte/icons/mic';
	import CornerDownLeft from 'lucide-svelte/icons/corner-down-left';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Switch } from '$lib/components/ui/switch';
	import AIMessage from '$lib/components/AIMessage.svelte';

	let isDeepSearchEnabled = false;
</script>

<div class="container mx-auto mt-4 flex h-[80%] flex-col rounded-lg border-2 border-dotted">
	<div class="flex-1 overflow-y-auto">
		<AIMessage
			citations={[
				{ title: 'Main Reference', url: 'https://example.com' },
				{ title: 'Quantum Computing 101', url: 'https://example.com/quantum' }
			]}
			searchSteps={[
				{
					step: 'Understanding the basic concepts',
					queries: ['what is quantum computing basics', 'quantum computing fundamental principles'],
					citations: [{ title: 'Quantum Computing 101', url: 'https://example.com/quantum' }]
				},
				{
					step: 'Analyzing practical applications',
					queries: [
						'quantum computing real world applications',
						'quantum computing use cases 2024'
					],
					citations: [{ title: 'Industry Applications', url: 'https://example.com/applications' }]
				}
			]}
		>
			Here's what I found after conducting a deep search analysis.
		</AIMessage>
	</div>
</div>
<Button
	class="mb-4"
	onclick={async () => {
		const response = await fetch('/chat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages: [
					{
						role: 'user',
						content: 'Hello! This is a test message.'
					}
				]
			})
		});
		const data = await response.json();
		console.log('API Response:', data);
	}}
>
	Test API Call
</Button>

<form
	class="absolute bottom-4 left-1/2 w-[70%] -translate-x-1/2 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
>
	<Label for="message" class="sr-only">Message</Label>
	<Textarea
		id="message"
		placeholder="Type your message here..."
		class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
	/>
	<div class="flex items-center p-3 pt-0">
		<div class="flex items-center gap-3">
			<Button variant="ghost" size="icon">
				<Paperclip class="size-4" />
				<span class="sr-only">Attach file</span>
			</Button>
			<Button variant="ghost" size="icon">
				<Mic class="size-4" />
				<span class="sr-only">Use Microphone</span>
			</Button>

			<div class="flex items-center gap-2 border-l pl-3">
				<div class="flex items-center gap-2">
					<Switch bind:checked={isDeepSearchEnabled} />
					<Label class="select-none text-xs text-muted-foreground">Deep Search</Label>
				</div>
			</div>
		</div>

		<Button type="submit" size="sm" class="ml-auto gap-1.5">
			Send Message
			<CornerDownLeft class="size-3.5" />
		</Button>
	</div>
</form>
