<script lang="ts">
  let width = $state(0);
</script>

<svelte:head>
  <title>guestbook</title>
  <meta name="og:description" content="my funny guestbook">
  <meta name="og:title" content="guestbook">
  <meta name="og:type" content="website">
  <meta name="og:url" content="https://rayne.page/guestbook">
</svelte:head>

<div bind:clientWidth={width}>
  <iframe src="https://raynepaws.atabook.org" frameborder="0" title="rayne's guestbook" width={width} height="600" style="display: block;"></iframe>
</div>
