import "./components/products";
import "./components/decorations";
import "./components/decoration-config";
import "./components/toy-card";
import "./components/filter-values";
import "./components/items-sort";
import "./styles/stylesheet.scss";
import { setItem, getItem } from "./scripts/storage";
import state from "./scripts/state";

const app = document.querySelector("main")!;
const container = document.querySelector("main")!;
const nav = document.querySelector("nav")!;
const storageKey = "OCHENSLOZHNOEIMYADLYAMOEGOLOKALSTORAGE";
const storageState = getItem(storageKey);
const search = document.querySelector(".header__search")! as HTMLElement;
const favs = document.querySelector(".header__favorites") as HTMLElement;
if (storageState) Object.assign(state, JSON.parse(storageState));
window.addEventListener("beforeunload", () => {
  setItem(storageKey, JSON.stringify(state));
});
search.hidden = true;
favs.hidden = true;
nav.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest(".header__toy-button")) {
    container.innerHTML = "<products-container></products-container>";
    search.hidden = false;
    favs.hidden = false;
  } else if (target.closest(".header__tree-button")) {
    container.innerHTML = "<decoration-container></decoration-container>";
    search.hidden = true;
    favs.hidden = false;
  } else if (target.closest(".header__storage-button")) {
    window.location.reload();
    localStorage.clear();
  } else if (target.closest(".header__start-button")) {
    search.hidden = true;
    favs.hidden = true;
    container.innerHTML = `
    <div class="start-page">
    <h1>Christmas Tree</h1>
    <button class="mdc-button mdc-button--outlined custom-text-button custom-outlined-button start-page__button">
      <span class="mdc-button__ripple"></span>
      <span class="mdc-button__label">Start</span>
    </button>
  </div>
    </div>`;
  }
});
app.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.closest(".start-page__button")) container.innerHTML = "<products-container></products-container>";
});
