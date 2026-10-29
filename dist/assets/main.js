(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#navigation");
  const closeMenu = () => { menu?.setAttribute("aria-expanded", "false"); nav?.classList.remove("is-open"); };
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open)); nav.classList.toggle("is-open", open);
  });
  nav?.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") { closeMenu(); menu.focus(); } });
  document.addEventListener("click", (event) => { if (!event.target.closest(".header")) closeMenu(); });
  document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll("[data-service]").forEach(link => link.addEventListener("click", () => { document.querySelector("#service").value = link.dataset.service; }));
  const form = document.querySelector("#help-form");
  if (!form) return;
  const status = document.querySelector("#form-status");
  const fieldset = document.querySelector("#request-fields");
  const phone = document.querySelector("#phone");
  let endpoint;
  try {
    const configured = window.PTS_CONFIG?.formEndpoint?.trim();
    if (configured) {
      const url = new URL(configured, window.location.href);
      if (url.protocol === "https:") endpoint = url.href;
    }
  } catch { /* Unconfigured: keep the honest call/email fallback. */ }
  if (!endpoint) { form.addEventListener("submit", event => event.preventDefault()); return; }
  fieldset.disabled = false;
  document.querySelector("#form-intro").textContent = "Tell us a little about what you need. All contact fields are required.";
  const validatePhone = () => {
    const digits = phone.value.replace(/\D/g, "");
    phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? "" : "Please enter a phone number with 10 to 15 digits.");
  };
  phone.addEventListener("input", validatePhone);
  let submitting = false;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (submitting) return;
    validatePhone();
    if (!form.reportValidity()) return;
    if (form.elements._gotcha.value) return;
    const data = new FormData(form);
    const button = form.querySelector("button[type=submit]");
    const oldLabel = button.innerHTML;
    submitting = true; button.disabled = true;
    button.textContent = "Sending…"; fieldset.disabled = true; form.setAttribute("aria-busy", "true");
    status.textContent = "Sending your request…";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" }, signal: controller.signal });
      if (!response.ok) throw new Error("Request not accepted");
      status.textContent = "Thanks! We've received your request. Petty Tech Solutions will be in touch soon.";
      form.reset(); phone.setCustomValidity("");
      // Count only accepted contact requests. Tracking must never affect form success.
      try {
        if (typeof window.gtag === "function") {
          window.gtag("event", "conversion", {
            send_to: "AW-18539183590/x4WfCIvMuq0dEOb7lYhF"
          });
        }
      } catch { /* Keep the successful submission experience if tracking is blocked. */ }
    } catch {
      status.textContent = "We couldn't send your request. Please try again or call us at (469) 732-7955.";
    } finally {
      clearTimeout(timer); submitting = false; button.disabled = false; fieldset.disabled = false; button.innerHTML = oldLabel; form.removeAttribute("aria-busy"); status.focus();
    }
  });
})();
