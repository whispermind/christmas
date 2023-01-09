import template from "./template";
import "./stylesheet.scss";
import state from "../../scripts/state";
import data from "../../scripts/data";

class TreeDecoration extends HTMLElement {
  audio: HTMLAudioElement = new Audio("./assets/audio/audio.mp3");

  interval: NodeJS.Timer | null = null;

  connectedCallback() {
    this.render();
    if (state.played) this.audio.play();
    if (state.snowflakes) this.interval = setInterval(this.createSnowflake, 100);
  }

  disconnectedCallback() {
    this.audio.pause();
    if (this.interval) clearInterval(this.interval);
  }

  private render() {
    this.innerHTML = template;
    this.classList.add("decorations");
    const dragArea = document.querySelector(".decorations__drag-area")! as HTMLElement;
    const tree = dragArea.querySelector("img")!;
    dragArea.style.backgroundImage = `url(./assets/bg/${state.background}.jpg)`;
    tree.src = `./assets/tree/${state.tree}.png`;
    this.addToys();
    this.addConfigListeners();
  }

  private addToys() {
    const defaultAmount = 20;
    const container = document.querySelector(".decorations__toys-container")!;
    if (!state.like.length) {
      for (let i = 0; i < defaultAmount; i += 1) {
        container.append(this.createToy(i));
      }
    }
    state.like.forEach((num) => {
      container.append(this.createToy(+num - 1));
    });
  }

  private addConfigListeners() {
    const mediaContainer = document.querySelector(".decoration-config__media-container")!;
    const treesContainer = document.querySelector(".decoration-config__tree-container")!;
    const backgroundContainer = document.querySelector(".decoration-config__background-container")!;
    const dragArea = document.querySelector(".decorations__drag-area")! as HTMLElement;
    const tree = dragArea.querySelector("img")!;
    mediaContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("decoration-config__sound-button")) this.toggleMusic();
      else if (target.classList.contains("decoration-config__snowflakes-button")) this.toggleSnowflakes();
    });
    treesContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("decoration-config__tree")) {
        const src = target.style.backgroundImage;
        tree.src = src.slice(src.indexOf('"') + 1, src.lastIndexOf('"'));
        const { num } = target.dataset;
        if (num) state.tree = +num;
      }
    });
    backgroundContainer.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains("decoration-config__background")) {
        const src = target.style.backgroundImage;
        dragArea.style.backgroundImage = src;
        const { num } = target.dataset;
        if (num) state.background = +num;
      }
    });
  }

  private createToy(num: number): HTMLElement {
    const thisComponent = document.querySelector(".decorations")!;
    const toyContainer = document.createElement("div");
    const toyImage = document.createElement("img");
    const amountContainer = document.createElement("div");
    const SRC = `./assets/toys/${data[num].num}.png`;
    toyImage.src = SRC;
    toyContainer.classList.add("decorations__toy");
    toyImage.classList.add("decorations__toy-image");
    amountContainer.classList.add("decorations__toy-amount");
    amountContainer.textContent = data[num].count;
    const dragStart = function dragStart(DSevent: MouseEvent) {
      const target = DSevent.target as HTMLElement;
      const shiftX = target.clientWidth / 2;
      const shiftY = target.clientHeight / 2;
      let amount = +amountContainer.textContent!;
      target.style.position = "absolute";
      target.style.opacity = "0.5";
      const mm = (e: MouseEvent) => {
        target.style.top = `${e.pageY - shiftY}px`;
        target.style.left = `${e.pageX - shiftX}px`;
      };
      window.addEventListener("mousemove", mm);
      if (!target.classList.contains("clone")) amountContainer.textContent = String((amount -= 1));
      const dragEnd = function dragEnd(DEevent: MouseEvent) {
        window.removeEventListener("mousemove", mm);
        if (!target.classList.contains("clone")) {
          target.style.position = "";
          target.style.opacity = "";
        }
        const destination = document.elementFromPoint(DEevent.pageX, DEevent.pageY) as HTMLElement;
        if (!destination || destination.tagName !== "AREA") {
          if (target.classList.contains("clone")) target.remove();
          if (!amount) toyImage.src = SRC;
          amountContainer.textContent = String((amount += 1));
          if (target.classList.contains("clone")) {
            target.remove();
          }
          return;
        }
        if (!amount) toyImage.src = "";
        if (target.classList.contains("clone")) {
          target.style.left = `${DEevent.pageX - shiftX}px`;
          target.style.top = `${DEevent.pageY - shiftY}px`;
          return;
        }
        const clone = document.createElement("img");
        clone.src = SRC;
        clone.style.position = "absolute";
        clone.style.left = `${DEevent.pageX - shiftX}px`;
        clone.style.top = `${DEevent.pageY - shiftY}px`;
        clone.classList.add("decorations__toy-image", "clone");
        clone.addEventListener("dragstart", dragStart);
        document.querySelector(".decorations__drag-area")!.append(clone);
      };
      window.addEventListener("mouseup", dragEnd, { once: true });
      DSevent.preventDefault();
    };

    toyContainer.append(toyImage);
    toyContainer.append(amountContainer);
    toyImage.addEventListener("dragstart", dragStart);
    return toyContainer;
  }

  private toggleMusic() {
    if (state.played) {
      this.audio.pause();
      state.played = false;
    } else {
      this.audio.play();
      state.played = true;
    }
  }

  private toggleSnowflakes() {
    if (state.snowflakes && this.interval) {
      state.snowflakes = false;
      clearInterval(this.interval);
    } else {
      state.snowflakes = true;
      this.interval = setInterval(this.createSnowflake, 100);
    }
  }

  private createSnowflake() {
    const snowflake = document.createElement("div");
    const size = `${Math.random() * 10 + 10}px`;
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random().toString();
    snowflake.style.width = size;
    snowflake.style.height = size;
    document.body.appendChild(snowflake);
    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }
}
customElements.define("decoration-container", TreeDecoration);
