import { reposition } from "nanopop";

export default {
//   updated(e, binding) {
//     window.document.querySelector(".popper").textContent = binding.value;
//   },
  mounted(el, binding, vnode, x) {
    console.log("init")
    var popperEl = window.document.querySelector(".popper");
    if (!popperEl) {
      popperEl = window.document.createElement("div");
      popperEl.className = "popper px-2";
      window.document.body.appendChild(popperEl);
    }
    el.onmouseenter = (e) => {
      if (typeof binding.value == "object") {
        popperEl.textContent = binding.value.text;
        reposition(e.srcElement, popperEl, { position: "right-middle" });
      } else {
        popperEl.textContent = binding.value;
        reposition(e.srcElement, popperEl, { position: "top-middle" });
      }
      popperEl.style.visibility = "visible";
    };
    el.onmouseleave = (e) => {
      popperEl.style.visibility = "hidden";
    };
  },
};