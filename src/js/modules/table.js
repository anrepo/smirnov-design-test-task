const columnTemplates = [
    '<input class="surname" type="text" name="surname" value="">',
    '<input class="name" type="text" name="name" value="">',
    '<select class="quality-1" name="quality-1"><option value=""> </option><option value="1">да</option><option value="0">нет</option></select>',
    '<select class="quality-2" name="quality-2"><option value=""> </option><option value="1">да</option><option value="0">нет</option></select>'
];

function addRow() {
    const columns = [];
    const columnLength = 4;
    const table = document.querySelector('#table-form .grid');

    for (let i=0; i <= columnLength - 1; i++) {
        // создание элементов
        columns[i] = document.createElement('div');

        // добавление классоа
        columns[i].classList.add('grid-cell');

        // добавление разметки
        columns[i].innerHTML = columnTemplates[i];

        // добавление в таблицу
        table.appendChild(columns[i]);
    }
}

function init() {
  console.log(`Connect Table`);

  let formElement = document.querySelector("#table-form");
  let inputCounterElement = document.querySelector("#counter");
  let addButtonElement = document.querySelector("#adder");

//   console.log(formElement);
//   console.log(inputCounterElement);
//   console.log(addButtonElement);

  addButtonElement.addEventListener('click', function() {
    console.log('Add Button Clicked!');
    addRow();
  });
}

export default {
  init,
};
