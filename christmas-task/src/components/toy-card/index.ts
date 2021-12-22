import template from "./template";
import "./stylesheet.scss";

class toyCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  private render() {
    this.innerHTML = template;
    this.setProps();
  }

  setProps() {
    const props: string[] = ["name", "count", "year", "shape", "color", "size"];
    const image = this.querySelector(`.toy-card__image`)! as HTMLImageElement;
    const imageSrc = `./assets/toys/${this.dataset.num}.png`;
    image.src = imageSrc;
    props.forEach((prop) => {
      const elem = this.querySelector(`.toy-card__${prop}`)! as HTMLElement;
      elem.textContent += this.dataset[prop]!;
    });
  }
}
customElements.define("toy-card", toyCard);
