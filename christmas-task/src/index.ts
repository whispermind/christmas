import "./components/products";
import "./components/decorations"
import "./components/decoration-config"
import "./components/toy-card";
import "./components/filter-values";
import "./components/items-sort"
import "./styles/stylesheet.scss";
import state from "./state";
const app = document.querySelector('main')!;
const container = document.querySelector('main')!;
const storageButton = document.querySelector('.storage')!;
const nav = document.querySelector('nav')!;
const storageKey = 'OCHENSLOZHNOEIMYADLYAMOEGOLOKALSTORAGE';
const storageState = localStorage.getItem(storageKey);

if(storageState) Object.assign(state, JSON.parse(storageState));
storageButton.addEventListener('click', () => {
  window.location.reload();
  localStorage.clear();
});
nav.addEventListener('click', (event) =>{
  const target = event.target as HTMLElement;
  if(target.classList.contains('header__toy-button')){
    container.innerHTML = '<products-container></products-container>';
  }else if(target.classList.contains('header__tree-button')){
    container.innerHTML = '<decoration-container></decoration-container>';
  }
});
window.addEventListener('beforeunload', () => {
  localStorage.setItem(storageKey, JSON.stringify(state));
});
app.innerHTML = `<products-container></products-container>`;