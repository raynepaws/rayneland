<script lang="ts">
	import Art from "$lib/components/Art.svelte";
	import type { ArtObject } from "$lib/index";
	import { marked } from "marked";
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let data: ArtObject;
  let description: string;

  onMount(async () => {
    const res = await fetch(page.url.href.concat(".json"));
    if (res.ok) data = await res.json();
    const res2 = await fetch(page.url.href.concat(".md"));
    if (res2.ok) description = await res2.text();
  })
</script>

<svelte:head>
  {#if data}
    <title>{data.name}</title>
  {:else}
    <title>art</title>
  {/if}
</svelte:head>

<section>
  {#if data}
    <h1>{data.name}</h1>
    <p>created {data.created}</p>
  {/if}
  <Art id={page.url.pathname.slice(5)} />
  {#if description}
    {#await marked(description) then text}
      {@html text}
    {/await}
  {/if}
</section>
<p style:text-align="center" class="grey">please do not sell my art, claim my art as your own creation, or use my art for machine learning or AI training.</p>
