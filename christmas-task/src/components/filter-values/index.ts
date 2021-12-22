import template from "./template";
import "./stylesheet.scss";
import state, { Istate } from "../../state";

class valuesFilter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = template;
    this.setListeners();
  }

  private setListeners() {
    const shapeFilter = this.querySelector(".values-filter")!;
    const lovelyFilter = this.querySelector(".values-filter__shapes")!;
    const activeClass = "selected";
    shapeFilter.addEventListener("click", (event) => {
      if (event.target instanceof HTMLButtonElement) {
        const value = event.target.dataset.value!;
        const type = event.target.dataset.type! as keyof Istate;
        const arr = state[type];
        if (event.target.classList.contains(activeClass) && arr instanceof Array) {
          const position = arr.indexOf(value);
          arr.splice(position, 1);
          event.target.classList.remove(activeClass);
        } else if (arr instanceof Array) {
          arr.push(value);
          event.target.classList.add(activeClass);
        }
      }
    });
    lovelyFilter.addEventListener("change", () => {
      if (state.like.length) {
        state.like.length = 0;
      } else {
        state.like.push("true");
      }
    });
  }
}
customElements.define("filter-values", valuesFilter);
