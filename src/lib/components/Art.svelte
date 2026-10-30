<script lang="ts">
	import { censorGore, censorNudity, type ArtObject } from "$lib";
	import { onMount } from "svelte";

  const { id }: {
    id: string
  } = $props();

  let data: ArtObject | undefined = $state();

  onMount(async () => {
    data = await (await fetch("/art/".concat(id, ".json"))).json();
  });
</script>

<style>
  art {
    overflow: hidden;
    position: relative;
  }

  .censor {
    filter: blur(3rem) brightness(0.6);
  }

  art > div {
    position: absolute;
    top: 1rem;
    left: 1rem;
    pointer-events: none;
  }

  /* art button {
    pointer-events: initial;
  } */
</style>

<art>
  <a href="/art/{id}"><img src="/art/{id}" class="dont-pixelate" class:censor={(data?.nudity && $censorNudity) || (data?.gore && $censorGore)} alt={data ? data.name : "art"}></a>
  {#if data && (($censorNudity && data.nudity) || ($censorGore && data.gore))}
    <div class="fc">
      {#if $censorNudity && data.nudity}
        <div>this drawing contains nudity</div>
      {/if}
      {#if $censorGore && data.gore}
        <div>this drawing contains gore</div>
      {/if}
      <!-- <button class="action" onclick={() => {
        data!.nudity = false;
        data!.gore = false;
      }}>show</button> -->
    </div>
  {/if}
</art>
