const template = `
<div class="values-filter">
  <h2>Фильтры по значению</h2>
  <div class="values-filter__shapes">
    <span>Форма:</span>
    <button class="values-filter__shape-button values-filter__shape-button_ball" data-value="шар" data-type="shape"></button>
    <button class="values-filter__shape-button values-filter__shape-button_pear" data-value="колокольчик" data-type="shape"></button>
    <button class="values-filter__shape-button values-filter__shape-button_cone" data-value="шишка" data-type="shape"></button>
    <button class="values-filter__shape-button values-filter__shape-button_snowflake" data-value="снежинка" data-type="shape"></button>
    <button class="values-filter__shape-button values-filter__shape-button_figure" data-value="фигурка" data-type="shape"></button>
  </div>
  <div class="values-filter__color">
  <span>Цвет:</span>
    <button class="values-filter__color-button values-filter__color-button_white" data-value="белый" data-type="color"></button>
    <button class="values-filter__color-button values-filter__color-button_yellow"data-value="желтый" data-type="color"></button>
    <button class="values-filter__color-button values-filter__color-button_red" data-value="красный" data-type="color"></button>
    <button class="values-filter__color-button values-filter__color-button_blue" data-value="синий" data-type="color"></button>
    <button class="values-filter__color-button values-filter__color-button_green" data-value="зелёный" data-type="color"></button>
  </div>
  <div class="values-filter__size">
    <span>Размер:</span>
    <button class="values-filter__size-button values-filter__size-button_large" data-value="большой" data-type="size"></button>
    <button class="values-filter__size-button values-filter__size-button_medium" data-value="средний" data-type="size"></button>
    <button class="values-filter__size-button values-filter__size-button_small" data-value="малый" data-type="size"></button>
  </div>
  <label>
    Только любимые:
    <input type="checkbox" class="values-filter__liked">
  </label>
</div>
`;
export default template;
