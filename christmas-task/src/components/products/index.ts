import template from "./template";
import data from "../../data";
import state from "../../state"
import "./stylesheet.scss"
interface Idescription {
  [index: string]: string;
  num: string;
  name: string;
  count:string;
  year:string;
  shape: string;
  color: string;
  size: string;
  favorite: string;
}

class products extends HTMLElement {
  async connectedCallback() {
    this.render();
  }
  private render() {
    this.innerHTML = template;
    this.addItems();
    const filters = document.querySelector('.products__filters')!;
    filters.addEventListener('click', (event) => {
      if(event.target instanceof HTMLButtonElement) this.addItems();
    })
    filters.addEventListener('change', () => this.addItems());
  }
  private addItems(){
    const container = document.querySelector('.products-items')!;
    container.innerHTML = '';
    data.forEach((itemData: Idescription) => {
      if(this.filterColor(itemData) && this.filterSize(itemData) && this.filterShape(itemData)){
      const item = document.createElement('toy-card');
      Object.keys(itemData).forEach((key) => item.dataset[key] = itemData[key] );
      container?.append(item);
      }
    });
  }
  private filterColor(item:Idescription):boolean{
    return true
  }
  private filterSize(item:Idescription):boolean{
    return true
  }
  private filterShape(item:Idescription):boolean{
    return true
  }
}
customElements.define("products-container", products);
