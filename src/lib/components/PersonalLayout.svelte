<script lang="ts">
  import { censorGore, censorNudity } from "$lib";
  import { discordAccount, type DiscordAccount } from "$lib/discord";
  import DropdownSection from "$lib/components/DropdownSection.svelte";
  import { onMount, type Snippet } from "svelte";
  import { page } from "$app/state";
  import type { Types } from "use-lanyard";
  import { getSwatches, type SwatchMap } from "colorthief";

  const { children, discord }: {
    children: Snippet,
    discord?: DiscordAccount
  } = $props();

  let now = $state(new Date());
  setInterval(() => now = new Date(), 1000);

  let currentlyPlaying: any = $state(null);
  let swatches: SwatchMap | null = $state(null);

  let presence: Types.Presence | null = $state(null);

  const heartbeat = async () => {
    const song = await (await fetch("https://lastfm-last-played.biancarosa.com.br/raynepaws/latest-song")).json();
    if (song.track?.["@attr"]) currentlyPlaying = song.track["@attr"].nowplaying === "true" ? song.track : null;
    presence = (await (await fetch(`https://api.lanyard.rest/v1/users/${discordAccount}`)).json()).data;
  }
  
  onMount(async () => {
    const fromLocalStorageGore = localStorage.getItem("censor-gore");
    if (fromLocalStorageGore) censorGore.set(fromLocalStorageGore === "true");
    else censorGore.set(false);
    const fromLocalStorageNudity = localStorage.getItem("censor-nudity");
    if (fromLocalStorageNudity) censorNudity.set(fromLocalStorageNudity === "true");
    else censorNudity.set(false);

    await heartbeat();
    setInterval(heartbeat, 15_000);
  });

  $effect(() => localStorage.setItem("censor-gore", `${$censorGore}`));
  $effect(() => localStorage.setItem("censor-nudity", `${$censorNudity}`));
</script>

<svelte:head>
  <link rel="stylesheet" href="/styles/personal.css">
</svelte:head>

<div style="position: absolute; top: 0; left: 0; z-index: -1; pointer-events: none; user-select: none; width: 100vw; height: 100vh; opacity: 0.8;">
  <img src="/media/doodles/swirl_left.png" aria-hidden="true" alt="" style="position: absolute; bottom: 2rem; left: 6rem;">
  <img src="/media/doodles/swirl_right.png" aria-hidden="true" alt="" style="position: absolute; top: 5rem; right: 6rem;">
</div>

<main style:--banner={`url(https://cdn.discordapp.com/banners/${discord?.id}/${discord?.banner}.png?size=1024)`}>
  <div>
    <div class="doodles">
      <img src="/media/doodles/discord_left.png" aria-hidden="true" alt="" style="top: -1.5rem; left: -2rem;">
      <img src="/media/doodles/discord_right.png" aria-hidden="true" alt="" style="top: 7rem; right: 1.3rem;">
      <img src="/media/doodles/side.png" aria-hidden="true" alt="" style="top: 20rem; left: -4.5rem;">
    </div>
    <div style="display: flex; gap: 1.5rem;">
      {#if discord}
        <section style:--image={`url(https://cdn.discordapp.com/banners/${discord.id}/${discord.banner}.png?size=512)`}>
          <div id="me" class="flex">
            <img src={`https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.webp?size=256`} alt="rayne">
            <div>
              <h1>Rayne <span class="grey">D.</span></h1>
              <div class="flex">
                {#if presence}
                  <div id="presence" class={presence.discord_status}><div></div><span>{presence.activities.find((activity) => activity.id === "custom")?.state ?? presence.discord_status}</span></div>
                {/if}
              </div>
            </div>
          </div>
        </section>
      {/if}
      {#if currentlyPlaying && presence && presence.spotify}
        <section id="music" style:--image="url({currentlyPlaying.image[3]["#text"]})" style:--primary={(swatches?.LightMuted?.color ?? swatches?.LightVibrant?.color ?? swatches?.Vibrant?.color)?.toString()}>
          <div>
            <img src={currentlyPlaying.image[2]["#text"]} alt={currentlyPlaying.album["#text"]} crossorigin="anonymous" onload={async (event) => swatches = await getSwatches(event.currentTarget)}>
            <div>
              <sub>listening to</sub>
              <div><a href={currentlyPlaying.url} title={currentlyPlaying.name}><strong>{currentlyPlaying.name}</strong></a></div>
              <sub>by {currentlyPlaying.artist["#text"]}</sub>
            </div>
          </div>
          <div>
            <div style:background-color={(swatches?.LightVibrant?.color ?? swatches?.LightMuted?.color ?? swatches?.Vibrant?.color ?? "#ffffff").toString().concat("75")} style:width={`${(now.getTime() - presence.spotify.timestamps.start) / (presence.spotify.timestamps.end - presence.spotify.timestamps.start) * 100}%`}></div>
          </div>
        </section>
      {/if}
    </div>
  </div>
  {@render children?.()}
</main>
<aside>
  <div>
    <div class="doodles">
      <img src="/media/doodles/corner.png" aria-hidden="true" alt="" style="top: -2.45rem; right: -2.7rem;">
    </div>
    <section>
      <ul>
        <li class:highlighted={page.url.pathname === "/"}><a href="/">home</a></li>
        <li class:highlighted={page.url.pathname === "/art"}><a href="/art">art</a></li>
        <li class:highlighted={page.url.pathname === "/commissions"}><a href="/commissions">commissions</a></li>
        <li class:highlighted={page.url.pathname === "/characters" || page.url.pathname.startsWith("/characters/")}><a href="/characters">characters</a></li>
        <li class:highlighted={page.url.pathname === "/contact"}><a href="/contact">contact</a></li>
        <li class:highlighted={page.url.pathname === "/projects"}><a href="/projects">projects</a></li>
        <li><a href="//ai.rayne.page">rAIne</a></li>
        <li><a href="//smp.rayne.page">RWSMP2 stats</a></li>
        <li class:highlighted={page.url.pathname === "/writing"}><a href="/writing">writing</a></li>
      </ul>
    </section>
  </div>
  <section id="clock">
    <sub>local time</sub>
    <span>
      {now.toLocaleTimeString("en-US", {
        timeZone: "America/Los_Angeles"
      }).toLowerCase()}
    </span>
  </section>
  <DropdownSection title="web rating" id="nav-web-rating">
    <p>this website is rated <strong>14+</strong>. adult themes, gory drawings, and drawings featuring censored nudity are present on this site.</p>
    <a href="https://www.mabsland.com/Adoption.html"><img src="/media/adopt_a_censor_14.gif" alt="Web 14"></a>
    <!-- <p>
      <input type="checkbox" bind:checked={$censorGore} id="censor-gore"><label for="censor-gore">censor gore</label><br>
      <input type="checkbox" bind:checked={$censorNudity} id="censor-nudity"><label for="censor-nudity">censor nudity</label>
    </p> -->
  </DropdownSection>
  <DropdownSection closed title="socials" id="nav-socials">
    <ul>
      <li><a href="https://artfight.net/~raynepaws">art fight</a></li>
      <li><a href="https://github.com/raynepaws">github</a></li>
      <li><a href="https://discord.com/users/1336737164691505246">discord (account)</a></li>
      <li><a href="https://discord.gg/mD6metDHNE">discord (server)</a></li>
      <li><a href="https://patreon.com/cw/raynepaws">patreon</a></li>
      <li><a href="https://toyhou.se/raynepaws">toyhouse</a></li>
    </ul>
  </DropdownSection>
  <div>
    <table style:margin="auto">
      <tbody>
        <tr>
          <td><a href="https://steve0greatness.github.io/webring/sites/breakfast/prev.xhtml">Prev</a></td>
          <td><a href="https://steve0greatness.github.io/webring"><img src="/media/0greatness_webring.webp" width="100" height="42" alt="0Greatness Webring"></a></td>
          <td><a href="https://steve0greatness.github.io/webring/sites/breakfast/next.xhtml">Next</a></td>
        </tr>
      </tbody>
    </table>
    <table style:margin="auto">
      <tbody>
        <tr>
          <td><a href="https://webring.kiwi2.xyz/api/user/raynepaws/previous"><img src="data:image/gif;base64,R0lGODdhMgA2AJEBAAC3/wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAMgA2AAACvYyPqcvtDyOYM9p7aMX8adCFzCeG31la57qlCwu3bhLDs1Hn4K3v643TBUnA3lCT6hF/JaOCKSJeUJJcR+qxcrBPYRTZcF65NO8YPNKayAjzmeKIzVhpusvelTehZX2SHaC2h9bnNkUVV7MG2Ka4xVfnqAL5YpiFCCFZhZkpGEa5CZrHmGhzKfMm2siJYUOG96cGOyg5G2saqJrqqvtoZXsLJ8aDMgw06neMDKycodlcyAztCe2cXF0Jhz1TAAAh+QQJCgABACwAAAAAMgA2AAACwoyPqcvtD6OctNqLswOc6995HxOKSTmS5bqmCwuHrhHXnWbnaKb3AO/TUYI7GmxCvJ2OkKRsyYokN8xHtRJV3bKYltZTBD5fsnDXjEChLV5ybLQ+2OBjdw1XVwjFeXnvcpX2x8ZllzNU+HWHlEj1xtjWtAjZ1zAoGYk56RinGGhYKfGpNypa6tdImBpwirXaivgo2OkqO6uUsomK6/KZ2ZsIezamO7MzN3P7w1oMrISc7EkbDR0NOp2sFmrNvLXNLVEAACH5BAkKAAEALAAAAAAyADYAAAK/jI+py+0Po5wUgXurdjjvn3QASBpi+YiqijLri7UKTMsHjY9kzntbDwQBe0JiaDU54TisZCewdCEhsNszdZJUTVdml/r6bL1NzXgRNYcb6crZWitOj+vSnB4Xl/Fv996Ss/MHmPczCBfklKVVCLYY0eb4JXlH6QPZSDZJUcnWqfhJ+OhXJ3UIOjoTihqj2YqyWir4tqrXeSpXKTsbmsqbWqs2FSnTRNwy9GrDNbQsauSsehydGe2pbK2ZjYkdUAAAOw==" alt="Previous"></a></td>
          <td><a href="https://webring.kiwi2.xyz/"><img src="https://webring.kiwi2.xyz/_app/immutable/assets/logo_blue.C2mp0xvT.svg" alt="Kiwi's Bodega Webring"></a></td>
          <td><a href="https://webring.kiwi2.xyz/api/user/raynepaws/next"><img src="data:image/gif;base64,R0lGODdhMgA2AJEBAAC3/wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgABACwAAAAAMgA2AAACuIyPqcvtD6OctAaAs9bW7p91FQiKFPmZE4qqD8u6CwzLCE3bF2fgvLs5+EKyoGKIMZVeLdGS+fSkVsZOFIKTkKi1yFab814dyGRjDPbNplL1kT0arn+q8JsI7N7gyuadXvf1h9eml4CWZrjHR+aGVfXox0UIJThpJiaZiMkgF0d5iFQIcOZ4wihkeskZaunEp2oFm5UHSVsEpxhYBrhbprMYCywM3HNb3KqJHOy6zIzqnIoYTV0NXAAAIfkECQoAAQAsAAAAADIANgAAArqMj6nL7Q+jRKDWiaW9ubcNeKIBbqNYlieWttb6uS3MyDZN2TJO6jrt+8FUQdMQpChyPMikcjSr3VCpmHLpiEKKEe2j6bU2mdWtChp0jk/C3Bq9S5SBLrWRHg7Mj2f7Cx7nh8XiI/bXkSb1ppGoeMjYlrX4VWh215WHeenWmDGp90T2yFmJOHlFtdmzt8K6+pl6F8knG4gzN8WDa4t3FcIDGgr82glcPExchyxHpLrsuiz4G204SH09UQAAIfkECQoAAQAsAAAAADIANgAAAr2Mj6nL7Q+jnLTaK4HWZntMeaIITuMJlBl6qg8Lcy4S1zNdo/dB8vHe+eByMkxvSCxWWgyiceTIXXSNZMrEbCZD2aj1WqVCSLCXeMkad9HrxZkNNcen5bDQ9VO86Wl925KXsAdYJ/gH9zeI1ec2Rxjo5xjhZCepZlN5NEmpdRi0tekZ8LVyl8nIteHFmaoUacmn+amIqGpIW8uBuaOze/Pl+ksK5GNFXAx6PCqljFTYvAwLfRs8TQ1mna19UwAAOw==" alt="Next"></a></td>
        </tr>
      </tbody>
    </table>
    <div class="doodles">
      <img src="/media/doodles/bottom.png" aria-hidden="true" alt="" style="top: 1rem; left: 0.7rem;">
    </div>
  </div>
</aside>
