import { MDCSwitch } from "@material/switch";
import template from "./template";
import "./stylesheet.scss";
import state from "../../state";

class ConfigDecoration extends HTMLElement {
  switcher: MDCSwitch | null = null;

  connectedCallback() {
    this.render();
    this.setListeners();
  }

  private render() {
    this.innerHTML = template;
    const button = document.querySelector(".mdc-switch") as HTMLButtonElement;
    const lights = document.querySelectorAll(".lightrope > li");
    const colorsContainers = document.querySelectorAll(".ligtrope");
    colorsContainers.forEach((elem) => {
      const htmlElement = elem as HTMLElement;
      if (!state.lights) htmlElement.style.display = "none";
    });
    lights.forEach((elem) => elem.classList.add(state.lightsColor));
    this.switcher = new MDCSwitch(button);
    if (state.lights) this.switcher.emit("click", {});
  }

  private setListeners() {
    const lightropesContainer = document.querySelector(".decoration-config__lights-container")!;
    const button = document.querySelector("#basic-switch")!;
    lightropesContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const color = target.dataset.color!;
      if (target.classList.contains("decoration-config__light-color")) {
        const list = document.querySelectorAll(".lightrope > li");
        list.forEach((elem) => {
          elem.setAttribute("class", color);
        });
        state.lightsColor = color;
      }
    });
    button.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const lightropes = document.querySelectorAll(".lightrope");
      const islightRopesOn = target.closest("#basic-switch")!.ariaChecked;
      lightropes.forEach((item) => {
        const elem = item as HTMLElement;
        if (islightRopesOn === "true") {
          elem.style.display = "";
          state.lights = true;
        } else {
          elem.style.display = "none";
          state.lights = false;
        }
      });
    });
  }
}
customElements.define("decoration-config", ConfigDecoration);
