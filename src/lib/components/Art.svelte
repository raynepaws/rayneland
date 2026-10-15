<script lang="ts">
    import { browser } from "$app/environment";
	import { censorGore, censorNudity, type ArtObject } from "$lib";
	import { onMount } from "svelte";

  const { captionless, id }: {
    captionless?: boolean,
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
    display: block;
    max-height: 70vh;
    width: fit-content;
  }

  art > a > img {
    max-height: 70vh;
  }

  .censor {
    filter: blur(3rem) brightness(0.6);
  }

  art > div.fc {
    position: absolute;
    top: 1rem;
    left: 1rem;
    pointer-events: none;
  }

  /* art button {
    pointer-events: initial;
  } */

  art > div.caption {
    background-color: #00000084;
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 0.2rem;
    pointer-events: none;
    display: flex;
    gap: 0.7rem;
  }
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
  {#if !captionless}
    <div class="caption">
      {#if browser}
        {#await fetch(`/art/${id}.json`) then res}
          {#if res.ok}
            {#await res.json() then data}
              <span>{data.name ?? "Untitled"}</span>
              <i>{data.created}</i>
            {/await}
          {/if}
        {/await}
      {/if}
    </div>
  {/if}
</art>
