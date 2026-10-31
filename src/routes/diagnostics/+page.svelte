<script lang="ts">
    import { onMount } from "svelte";

  let { data } = $props();
  let diagnostics: string = $state("");

  const d = async (line?: string) => new Promise<void>(resolve => {
    let i = 0;
    const toPrint = ((line ?? "") + "\n");
    const interval = setInterval(() => {
      diagnostics += toPrint[i];
      i++;
      if (i === toPrint.length) {
        clearInterval(interval);
        resolve();
      };
    }, 5);
  });

  onMount(async () => {
    await d("rayne service diagnostics (https://rayne.page/diagnostics)");
    await d(`  @ ${new Date().toISOString()}`);
    await d();
    await d("=============== SERVICES ===============");
    await d();
    await d(`  [${data.homeOk ? "x" : " "}] rayne.page`);
    await d(`    ${data.homeStatus}`);
    await d(`  [${data.aiOk ? "x" : " "}] ai.rayne.page`);
    await d(`    ${data.aiStatus}`);
    await d(`  [${data.dokployOk ? "x" : " "}] dokploy.rayne.page`);
    await d(`    ${data.dokployStatus}`);
    await d(`  [${data.gitOk ? "x" : " "}] git.rayne.page`);
    await d(`    ${data.gitStatus}`);
    await d(`  [${data.smpOk ? "x" : " "}] smp.rayne.page`);
    await d(`    ${data.smpStatus}`);
    await d();
    await d(`${Object.values(data).filter(v => v).length - 5} online`);
    await d(`${Object.values(data).filter(v => !v).length} offline`);
  })
</script>

<svelte:head>
  <title>diagnostics</title>
</svelte:head>

<style>
  @font-face {
    font-family: "monitor";
    src: url("/fonts/Web437_NEC_APC3_8x16.woff");
  }

  :global(body) {
    background-color: #000000;
    color: #ffffff;
    font-family: "monitor";
    line-height: 1rem;
    font-size: 1rem;
    margin: 4rem;
  }

  ::selection {
    background-color: #ffffff;
    color: #000000;
  }

  pre, pre code {
    font-family: inherit;
  }
</style>

<pre><code>{diagnostics}</code></pre>
