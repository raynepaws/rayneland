<script lang="ts">
  import FeaturedProjects from "$lib/components/FeaturedProjects.svelte";
  import { onMount } from "svelte";

  let feed: Document | null = $state(null);

  onMount(async () => {
    feed = new DOMParser().parseFromString(await (await fetch("/feed.rss")).text(), "text/xml");
  });
</script>

<svelte:head>
  <title>rayne.page</title>
</svelte:head>

<section>
  <p>hey, my name is rayne! this is my funny little spot on the internet.</p>
  <p>i'm non-binary, and use any pronouns! i'm also a high school junior, a digital artist, and a web developer. i spend most of my time talking on my <a href="https://discord.gg/mD6metDHNE">discord server</a> or working on <a href="/projects">software projects</a>.</p>
</section>
<!-- svelte-ignore a11y_distracting_elements -->
<marquee>i love my supporters: <a class="rainbow" href="https://playfulmathematician.com">bringupyourpost</a>, <a class="rainbow" href="https://dumorando.com">dumorando</a>, <a href="https://milosantos.com">Milo</a>, <a href="https://samv.me">shock59</a></marquee>
<section>
  <h2>blog</h2>
  <ul>
    {#each feed?.querySelectorAll("item") as post}
      <li><a href="/feed/{post.querySelector("guid")?.innerHTML}">{post.querySelector("title")?.innerHTML}</a> - {post.querySelector("pubDate")?.innerHTML}</li>
    {/each}
  </ul>
</section>
<section>
  <h2>what i'm working on</h2>
  <ul>
    <li><a href="https://github.com/raynepaws/weathercord">Weathercord</a> is a highly-customizable and personal instant messaging app driven by the fact that i'm annoyed with paywalls and think the design of many current platforms could be improved</li>
    <li><a href="https://github.com/nekomide">Nekomide</a> is my web development IDE that i've been working on since april 2024. it truly is my passion project and i love it more than anything else i've ever created</li>
    <li>I've been developing some cool stuff for <a href="https://nitrobolt.org">NitroBolt</a>, which is really cool because i admired the project from afar for quite some time</li>
  </ul>
  <p>for a full list of projects i've created, check out <a href="/projects">this page</a>!</p>
  <FeaturedProjects />
</section>
