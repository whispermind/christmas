import template from "./template";
import data from "../../data";
import state from "../../state";
import "./stylesheet.scss";
interface Idescription {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

class products extends HTMLElement {
  liked: HTMLElement = document.querySelector('.header__favorites')!;
  async connectedCallback() {
    this.liked.textContent = state.like.length.toString();
    this.render();
  }

  private render() {
    this.innerHTML = template;
    this.addListeners();
    this.filterItems();
  }

  private filterItems() {
    let filtred: Idescription[];
    filtred = this.filterColor(JSON.parse(JSON.stringify(data)));
    filtred = this.filterShape(filtred);
    filtred = this.filterSize(filtred);
    filtred = this.filterColor(filtred);
    filtred = this.filterLike(filtred);
    this.renderItems(filtred);
  }
  private renderItems(arr:Idescription[]){
    const container = document.querySelector(".products-items")!;
    container.innerHTML = "";
    arr.forEach((itemData) => {
      const item = document.createElement('toy-card');
      Object.keys(itemData).forEach((key) => item.dataset[key] = itemData[key as keyof Idescription]);
      if(state.like.includes(itemData.num)) item.classList.add('toy-card__like_active');
      container.append(item);
      });
  }

  private addListeners() {
    const itemsContainer = document.querySelector(".products-items")!;
    const filters = document.querySelector(".products-filters")!;
    filters.addEventListener("click", (event) => {
      if (event.target instanceof HTMLButtonElement) this.filterItems();
    });
    filters.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      if(target && target.classList.contains('values-filter__liked')) state.likedOnly = target.checked;
      this.filterItems()
    });
    itemsContainer.addEventListener("click", (event) => {
      const target = event.target! as HTMLElement;
      const component = target.closest("toy-card")! as HTMLElement;
      if ((component && event.target instanceof HTMLElement) || event.target instanceof SVGElement) {
        const activeClass = "toy-card__like_active";
        const num: string = component.dataset.num!;
        if (component.classList.contains(activeClass)) {
          const position = state.like.indexOf(num);
          state.like.splice(position, 1);
        } else {
          state.like.push(num);
        }
        console.log(state.like);
        component.classList.toggle(activeClass);
        this.liked.textContent = state.like.length.toString();
      }
    });
  }

  private filterColor(arr: Idescription[]) {
    if (state.color.length) {
      return arr.filter((elem: Idescription) => state.color.includes(elem.color));
    }
    return arr;
  }

  private filterSize(arr: Idescription[]): Idescription[] {
    if (state.size.length) {
      return arr.filter((elem: Idescription) => state.size.includes(elem.size));
    }
    return arr;
  }

  private filterShape(arr: Idescription[]): Idescription[] {
    if (state.shape.length) {
      return arr.filter((elem: Idescription) => state.shape.includes(elem.shape));
    }
    return arr
  }

  private filterLike(arr: Idescription[]): Idescription[] {
    if (state.likedOnly) {
      return arr.filter((elem: Idescription) => state.like.includes(elem.num));
    }
    return arr;
  }

}
customElements.define("products-container", products);
