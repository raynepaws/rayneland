<script lang="ts">
  const open = true;
</script>

<svelte:head>
  <title>art commissions</title>
</svelte:head>

<style>
  .flex a {
    width: 0;
    flex-grow: 1;
  }
  .flex a img {
    border-radius: 1rem;
  }
</style>

{#if !open}
  <section>
    commissions are currently closed. check back later!
  </section>
{/if}
<section>
  <h1>Art commission info</h1>
  <h2>Terms of service</h2>
  <p>By commissioning me, you confirm that you have read and agree to these terms. Violation of these terms will result in termination of business and a block from future commission requests.</p>
  <ul>
    <li>Please be respectful and patient.</li>
    <li>Refunds are not available after you've paid in full.</li>
    <li>You are not allowed to resell the commissioned artwork.</li>
    <li>You are not allowed to use my artwork for commercial purposes unless I explicity tell you you can.</li>
    <li>You are not allowed to use my artwork to train generative AI.</li>
    <li>You are not allowed to use my artwork in prompts for generative AI.</li>
    <li>I reserve the right to refuse service to anyone for any reason.</li>
    <li>You must comply with the usage rights shown below.</li>
  </ul>
</section>
<section>
  <h2>Usage rights</h2>
  <p>I own copyright over the artwork. by default, you own a personal usage license for the artwork that never expires. this means you're allowed to use my art for profile pictures and wallpapers and stuff. Credit when using as a pfp is not required but super duper appreciated! if you want to use the commissioned artwork for commercial purposes, like merchandise and stuff, talk to me and let's figure out an alternative price.</p>
</section>
<section>
  <h2>Can/will draw</h2>
  <ul>
    <li>Humanoids</li>
    <li>Romance between characters (must have permission from owners of characters)</li>
    <li>Mildly suggestive content</li>
  </ul>
</section>
<section>
  <h2>Won't draw</h2>
  <ul>
    <li>Nudity</li>
    <li>Bulges or nipple protrusions through shirt</li>
    <li>Sex or bodily fluids</li>
    <li>Fetish content</li>
    <li>Gore</li>
    <li>Muscular humanoids</li>
    <li>Anthros</li>
  </ul>
</section>
<section>
  <h2>process</h2>
  <p>through email or, more preferably, discord (both linked on my <a href="/contact">contact page</a>), you'll tell me what you want to buy. i charge half price up front. payment is done through stripe.</p>
  <p>after this is paid, i'll draw a sketch of your request and show it to you and ask for feedback. if you have any feedback, i will modify the sketch according to your feedback and ask for your feedback again. this cycle repeats until you are satisfied.</p>
  <p>after you are satisfied, you will pay the other half of the price. after this, the purchase becomes exclusively eligible for a 50% partial refund. after this is paid i will begin coloring and drawing your chosen add-ons, if any. i will then send you the completed artwork, and the purchase becomes non-refundable.</p>
</section>
<section>
  <h2>prices</h2>
  <p>all prices are in USD.</p>
  <h3>portrait type</h3>
  <p>
    <strong>$15/character</strong> - bust (head to shoulders)<br>
    <strong>$20/character</strong> - half body (head to waist/hips)<br>
    <strong>$25/character</strong> - full body (head to legs)
  </p>
  <h3>optional add-ons</h3>
  <p>
    <strong>+$5</strong> - basic/partial shading<br>
    <strong>+$10</strong> - advanced shading
  </p>
  <p>
    <strong>+$5</strong> - simple background<br>
    <strong>+$10</strong> - scene
  </p>
</section>

<div class="flex">
  <a href="https://artfight.net/attack/13083780"><img src="https://images.artfight.net/attack/cRIFcfTjLKwUeG1YmmlWph18mAw8RP9KOntcuyb4Er5rvQ0jQDznv7O0t31f.png?t=1782952218" alt="ezra"></a>
  <a href="https://artfight.net/attack/14042293"><img src="https://images.artfight.net/attack/HH5JwH8zfVYKGzw3uFz0gws3M9mJTOUqQPRaAavw8VuDG0WORAr1T0Ggo0Qg.png?t=1783145986" alt="souppe"></a>
</div>
<div class="flex">
  <a href="https://artfight.net/attack/15372638"><img src="https://images.artfight.net/attack/cfI94VTtawAuBPPqtyrDEvaDLlE2DrTvPscQ0DxJL0JMb8DW4dGlgwrXnoCE.png?t=1783555111" alt="fin"></a>
  <a href="https://toyhou.se/~images/114344838"><img src="https://f2.toyhou.se/file/f2-toyhou-se/images/114344838_Ef3kySPo1Q0cM0M.png" alt="rayne"></a>
</div>
