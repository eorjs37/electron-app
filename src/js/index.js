window.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    if (window.api) {
      const { sendToMessage } = window.api;
      sendToMessage("TEST!");
    }
  });
});
