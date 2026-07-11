<script lang="ts">
  import { Oneko } from "lots-o-nekos";
  import { onMount } from "svelte";

  let places: { name: string, place: number }[] = $state([]);
  let onekos: Oneko[] = [];

  onMount(() => {
    let names = [
      "bob",
      "susan",
      "dave",
      "joe",
      "fred",
      "holly",
      "samantha",
      "patty",
      "shirley",
      "jeff"
    ];
  
    const oneko_num = 10;
    let place = 1;
  
    if (oneko_num !== null) {
      for (let i = 0; i < oneko_num; i++) {
        let oneko = new Oneko();
        if (oneko.isInitialized() && oneko.element) {
          oneko.x = 20;
          oneko.y = Math.random() * window.innerHeight;
          oneko.speed = 5 + Math.random() * 10;
          oneko.updateSpeed = 60 + Math.random() * 20;
          oneko.setTarget(oneko.x, oneko.y);
          oneko.element.style.filter = `sepia(1) saturate(4) hue-rotate(${Math.random() * 360}deg)`;
          let name = names[Math.floor(Math.random() * names.length)];
          names = names.filter(fname => fname !== name);
          oneko.element.innerHTML = `<span>${name}</span>`;
          oneko.addEventListener("stopRunning", () => {
            if (!document.getElementById("start")) {
              places.push({
                name: oneko.element?.innerText ?? "",
                place: place
              })
              place += 1;
            }
          });
          
          onekos.push(oneko);
        }
      }
    }
  });

</script>

<style>
  :root {
    color-scheme: light;
  }

  :global(body) {
    background-color: #ffffff;
    color: #000000;
  }

  :global(.oneko span) {
    position: relative;
    top: -1rem;
  }
</style>

<a href="/" data-sveltekit-reload>&lt;-- back</a> | <a href="/race" data-sveltekit-reload>reload</a>
<h1>oneko racing</h1>
<p>made with <a href="https://github.com/raynepaws/lots-o-nekos">lots-o-nekos</a></p>
<button id="start" onclick={(event) => onekos.forEach((oneko) => {
  event.currentTarget.remove();
  if (oneko.isInitialized())oneko.setTarget(window.innerWidth - oneko.x, oneko.y);
})}>start</button>
{#each places as place}
  <p>{place.place}: {place.name}</p>
{/each}
