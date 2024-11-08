<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";

  let inputValue = $state();
</script>

<div class="w-full flex h-min justify-center bottom-6 fixed">
  <div
    placeholder="Input text here"
    contenteditable="true"
    bind:textContent={inputValue}
    class="w-[60%] whitespace-pre hover:bg-gray-600 focus-within:shadow-lg focus-within:scale-x-105 ring-transparent outline-2 ring-4 transition-all text-white resize-none outline-none text-sm p-4 bg-opacity-90 backdrop-blur-lg bg-slate-700 text-start rounded-lg"
  ></div>
  <button
    aria-label="send"
    class="rounded-full p-3 hover:bg-gray-600 transition-colors active:scale-95 active:bg-slate-600 hover:shadow-lg ml-10 bg-opacity-90 backdrop-blur-lg bg-slate-700"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-arrow-up"
      ><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg
    ></button
  >
</div>
