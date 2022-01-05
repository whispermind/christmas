const template = `
<div class="sort">
    <h2>Сортировка</h2>
    <select id="sort">
      <option value="1" selected>А-Я</option>
      <option value="2">Я-А</option>
      <option value="3">По дате от меньшего к большему</option>
      <option value="4">По дате от большего к меньшему</option>
    </select>
  <button class="cleaner">очистить фильтры</button>
</div>`;
export default template;
