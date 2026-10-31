export const load = async ({ fetch }) => {
  const home = (await fetch(`https://rayne.page`));
  const ai = (await fetch(`https://ai.rayne.page`));
  const dokploy = (await fetch(`https://dokploy.rayne.page`));
  const git = (await fetch(`https://git.rayne.page`));
  const smp = (await fetch(`https://smp.rayne.page`));
  return {
    homeOk: home.ok,
    aiOk: ai.ok,
    dokployOk: dokploy.ok,
    gitOk: git.ok,
    smpOk: smp.ok,
    homeStatus: home.status,
    aiStatus: ai.status,
    dokployStatus: dokploy.status,
    gitStatus: git.status,
    smpStatus: smp.status
  };
};
