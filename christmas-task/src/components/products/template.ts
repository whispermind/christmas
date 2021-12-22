const template = `
  <div class="products">
    <div class="products-filters">
      <filter-values></filter-values>
      <div class="range-filter">
  <h2>Фильтры по диапазону</h2>
  <div class="slider-container">
    <h3>Количество экземпляров</h3>
    <div class="slider__controls">
      <input class="slider__amount-min" type=number disabled>
      <div class="range-filter__amount-slider"></div>
      <input class="slider__amount-max" type="number" disabled>
    </div>
  </div>
  <div class="slider-container">
    <h3>Год приобритения</h3>
    <div class="slider__controls">
      <input class="slider__years-min" type=number disabled>
      <div class="range-filter__year-slider"></div>
      <input class="slider__years-max" type="number" disabled>
    </div>
  </div>
</div>
      <items-sort></items-sort>
    </div>
    <div class="products-items">
    </div>
  </div>
`;
export default template;
