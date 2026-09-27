(() => {
  const section = document.querySelector("[data-playground-url]");
  if (!section) return;
  const button = section.querySelector("[data-launch-playground]");
  const url = new URL(section.dataset.playgroundUrl);
  const frame = document.createElement("iframe");
  frame.title = "Interactive Game of Life and ClojureScript rule editor";
  frame.className = "life-frame";
  // The app runs on a separate origin. Same-origin access within that origin
  // is needed for its worker; forms, top navigation, and popups stay disabled.
  frame.setAttribute("sandbox", "allow-scripts allow-same-origin");
  frame.referrerPolicy = "strict-origin";
  window.addEventListener("message", event => {
    if (event.source !== frame.contentWindow || event.origin !== url.origin) return;
    if (event.data?.type !== "matlux-life:height" || !Number.isFinite(event.data.height)) return;
    frame.style.height = `${Math.max(400, Math.min(4000, Math.ceil(event.data.height)))}px`;
  });
  frame.addEventListener("load", () => {
    frame.contentWindow.postMessage({ type: "matlux-life:measure" }, url.origin);
  });
  button.addEventListener("click", () => {
    frame.src = url.href;
    section.querySelector(".life-frame-slot").append(frame);
    section.querySelector(".life-launch-panel").hidden = true;
    section.querySelector(".life-frame-help").hidden = false;
    frame.focus();
  }, { once: true });
})();
