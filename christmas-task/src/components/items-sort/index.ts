import template from "./template";
import "./stylesheet.scss";

class Sorter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = template;
  }
}
customElements.define("items-sort", Sorter);
