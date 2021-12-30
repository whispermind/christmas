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
const nav = document.querySelector('nav')!;
const storageKey = 'OCHENSLOZHNOEIMYADLYAMOEGOLOKALSTORAGE';
const storageState = localStorage.getItem(storageKey);

if(storageState) Object.assign(state, JSON.parse(storageState));
window.addEventListener('beforeunload', () => {
  localStorage.setItem(storageKey, JSON.stringify(state));
});
nav.addEventListener('click', (event) =>{
  const target = event.target as HTMLElement;
  if(target.classList.contains('header__toy-button')){
    container.innerHTML = '<products-container></products-container>';
  }else if(target.classList.contains('header__tree-button')){
    container.innerHTML = '<decoration-container></decoration-container>';
  }else if(target.classList.contains('header__storage-button')){
    window.location.reload();
    localStorage.clear();
  }else if(target.classList.contains('header__start-button')){
    container.innerHTML = `
    <div class="start-page">
      <h1>Christmas tree</h1>
      <button class="start-page__button">START</button>
    </div>`
  };
});
app.addEventListener('click', (event) =>{
  const target = event.target as HTMLElement;
  if(target.classList.contains('start-page__button')) container.innerHTML = '<products-container></products-container>';
});