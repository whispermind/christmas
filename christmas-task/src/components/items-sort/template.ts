const template = `
<div class="sort">
  <label>
    Сортировка:
    <select id="sort">
      <option value="1" selected>А-Я</option>
      <option value="2">Я-А</option>
      <option value="3">По дате от меньшего к большему</option>
      <option value="4">По дате от большего к меньшему</option>
    </select>
  </label>
  <button class="cleaner">очистить фильтры</button>
</div>`;
export default template