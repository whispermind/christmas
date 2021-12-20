const template = `
<div class="values-filter">
  <h2>Фильтры по значению</h2>
  <div class="values-filter__shapes">
    <span>Форма:</span>
    <button class="values-filter__shape-button values-filter__shape-button_ball"></button>
    <button class="values-filter__shape-button values-filter__shape-button_pear"></button>
    <button class="values-filter__shape-button values-filter__shape-button_cone"></button>
    <button class="values-filter__shape-button values-filter__shape-button_snowflake"></button>
    <button class="values-filter__shape-button values-filter__shape-button_figure"></button>
  </div>
  <div class="values-filter__color">
  <span>Цвет:</span>
    <button class="values-filter__color-button values-filter__color-button_white"></button>
    <button class="values-filter__color-button values-filter__color-button_yellow"></button>
    <button class="values-filter__color-button values-filter__color-button_red"></button>
    <button class="values-filter__color-button values-filter__color-button_blue"></button>
    <button class="values-filter__color-button values-filter__color-button_green"></button>
  </div>
  <div class="values-filter__size">
    <span>Размер:</span>
    <button class="values-filter__size-button values-filter__size-button_large"></button>
    <button class="values-filter__size-button values-filter__size-button_medium"></button>
    <button class="values-filter__size-button values-filter__size-button_small"></button>
  </div>
  <label>
    Только любимые:
    <input type="checkbox">
  </label>
</div>
`;
export default template;