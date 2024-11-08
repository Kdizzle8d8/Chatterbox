<script lang="ts">
	import '../app.css';
  import { Button } from "$lib/components/ui/button/index.js";
	let { children } = $props();
</script>

<div>
	<Button class="absolute top-4 right-4"></Button>
	{@render children()}
</div>
