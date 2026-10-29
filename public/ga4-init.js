// External initialization keeps analytics compatible with a CSP that disallows
// arbitrary inline scripts. The measurement ID is public, not a credential.
(() => {
  const id = document.currentScript?.getAttribute("data-ga-id");
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id);
})();
