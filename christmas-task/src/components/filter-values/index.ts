import template from "./template";
import "./stylesheet.scss"
import state from '../../state'
class valuesFilter extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  private render() {
    this.innerHTML = template;
  }
}
customElements.define("filter-values", valuesFilter);
