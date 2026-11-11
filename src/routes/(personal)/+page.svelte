<script lang="ts">
  import { onMount } from "svelte";

  let feed: Document | null = $state(null);

  onMount(async () => {
    feed = new DOMParser().parseFromString(await (await fetch("/feed.rss")).text(), "text/xml");
  });
</script>

<svelte:head>
  <title>rayne.page</title>
  <script id="discord:component-embed" type="application/json">
    {
        "component": {
            "type": 17,
            "components": [
                {
                    "type": 9,
                    "components": [
                        {
                            "type": 10,
                            "content": "# rayne d. <a:rayne_wag:1539460806805295135>\nhii i'm rayne. i'm a high schooler in the pacific northwest, an artist, and a computer scientist. woof ruff <:pwease_rayne:1538715994053410947>"
                        }
                    ],
                    "accessory": {
                          "type": 11,
                          "media": { "url": "https://rayne.page/media/heads/rayne.gif" }
                    }
                },
                {
                    "type": 1,
                    "components": [
                        {
                            "type": 2,
                            "style": 5,
                            "label": "Toyhouse",
                            "emoji": {
                                "name": "🦴"
                            },
                            "url": "https://toyhou.se/raynepaws"
                        },
                        {
                            "type": 2,
                            "style": 5,
                            "label": "GitHub",
                            "emoji": {
                                "name": "github",
                                "id": "1249495348183826564"
                            },
                            "url": "https://github.com/raynepaws"
                        }
                    ]
                }
            ]
        }
    }
    </script>
</svelte:head>

<section>
  <p>hi, i'm rayne! welcome to by little corner of the internet!</p>
  <p>i'm non-binary and use they/them pronouns. i'm also a high school junior, digital artist, and software developer.</p>
</section>
<!-- svelte-ignore a11y_distracting_elements -->
<marquee>i love my supporters: <a class="rainbow" href="https://dumorando.com">dumorando</a>, <a href="https://milosantos.com">Milo</a>, <a href="https://samv.me">shock59</a></marquee>
<section>
  <h2>what i've been doing</h2>
  <ul>
    <li>refining my <a href="https://lichess.org/@/raynepaws">chess skills</a>. i've gotten a lot better these past few months ^^</li>
    <li>doing a little <a href="https://toyhou.se/raynepaws/art">drawing</a></li>
    <li>developing some <a href="https://github.com/Nitro-Bolt/scratch-gui/pulls?q=is%3Apr+author%3Araynepaws">cool stuff</a> for <a href="https://nitrobolt.org">nitrobolt</a>!</li>
  </ul>
</section>
