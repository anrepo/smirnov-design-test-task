const columnLength = 4;
const columnTemplates = [
  '<input class="surname" type="text" name="surname" value="">',
  '<input class="name" type="text" name="name" value="">',
  '<select class="quality-1" name="qualityOne"><option value="0"> </option><option value="1">да</option><option value="2">нет</option></select>',
  '<select class="quality-2" name="qualityTwo"><option value="0"> </option><option value="1">да</option><option value="2">нет</option></select>',
];

function setSelectEvent(element) {
    element.addEventListener('change', function() {
        checkState();
    });
}

function setInputEvent(element) {
    let firstValue = element.value;

    element.addEventListener('input', function() {
        if (element.value !== '' && firstValue === ''
            || element.value === '' && firstValue !== ''
        ) {
            checkState();
            firstValue = element.value;
        }
    });
}

function delPrefix(element) {
    let prefix = "color--";
    let classes = element.className.split(" ").filter(function(cl) {
        return cl.lastIndexOf(prefix, 0) !== 0;
    });

    element.className = classes.join(" ").trim();
}

function addRow() {
  const cell = [];
  const table = document.querySelector("#table-form .grid");
  const inputCounterElement = document.querySelector("#counter");

  if (inputCounterElement.value) {
    for (let j = 0; j <= inputCounterElement.value - 1; j++) {
      for (let i = 0; i <= columnLength - 1; i++) {
        // создание элементов
        cell[i] = document.createElement("div");

        // добавление классоа
        cell[i].classList.add("grid-cell");

        // добавление разметки
        cell[i].innerHTML = columnTemplates[i];

        // назначаем событие
        setEvents(cell[i]);

        // вставка элемента в таблицу
        table.appendChild(cell[i]);
      }
    }
  } else {
    console.error("Нет значения!");

    return 0;
  }
}

function setEvents(cell) {
    if (!cell) {
        let selectAll = document.querySelectorAll('#table-form .grid select');
        let inputAll = document.querySelectorAll('#table-form .grid input');

        selectAll.forEach(function (select) {
            setSelectEvent(select);
        });

        inputAll.forEach(function (input) {
            setInputEvent(input);
        });

    } else {
        if (cell.firstElementChild.tagName === "INPUT") {
            setInputEvent(cell.firstElementChild);
        }

        if (cell.firstElementChild.tagName === "SELECT") {
            setSelectEvent(cell.firstElementChild);
        }
    }
}

function checkState() {
    // индекс начала строки
    let indexStart;
    // счётчик итераций в строке
    let rowIterator = 0;
    // состояние строки (для подсветки)
    let rowState = {
        emptyField: 0,
        qualityOne: 0,
        qualityTwo: 0
    };
    const cells = document.querySelectorAll(".grid-cell");

    function cleanState() {
        rowState = {
            emptyField: 0,
            qualityOne: 0,
            qualityTwo: 0
        }
    }

    function highlightRow(indexStart, indexEnd) {
        for (let i = indexStart; i <= indexEnd; i++) {
            if (rowState.emptyField == 0) {
                if (rowState.qualityOne === 2 || rowState.qualityTwo === 2) {
                    delPrefix(cells[i]);
                    cells[i].classList.add('color--yellow');
                }

                if (rowState.qualityOne === 1 && rowState.qualityTwo === 1) {
                    delPrefix(cells[i]);
                    cells[i].classList.add('color--green');
                }

                if (rowState.qualityOne === 2 && rowState.qualityTwo === 2) {
                    delPrefix(cells[i]);
                    cells[i].classList.add('color--red');
                }
            } else {
                delPrefix(cells[i]);
                cells[i].classList.add('color--white');
            }
        }
    }

    for (let n = 0; n <= cells.length - 1; n++) {
        const cellInnerElement = cells[n].firstElementChild;

        // условие начала проверки строки
        if (n % columnLength === 0 && rowIterator === 0) {
            rowIterator = 1;

            // запоминаем индекс начальной ячейки
            indexStart = n;
        }

        if (cellInnerElement.tagName === "INPUT") {
            if (cellInnerElement.value === '') {
                rowState.emptyField++;
            }
        }

        if (cellInnerElement.tagName === "SELECT") {
            const selectName = cellInnerElement.getAttribute('name');

            // значение не выбрано
            if (cellInnerElement.value === '0') {
                rowState.emptyField++;
            }

            // выбрано "да"
            if (cellInnerElement.value === '1') {
                rowState[selectName] = 1;
            }

            // выбрано "нет"
            if (cellInnerElement.value === '2') {
                rowState[selectName] = 2;
            }
        }

        if ((n + 1) % columnLength === 0) {
            // конец проверки текущей строки
            if (rowIterator === 1) {
                rowIterator = 0;

                // применяем правила выделения строки
                highlightRow(indexStart, n);

                // очистка состояния строки
                cleanState();
            }
        }
    }

    // применяем правила выделения строки
    highlightRow();
    setEvents();
}

function init() {
  let addButtonElement = document.querySelector('#adder');

  addButtonElement.addEventListener("click", function () {
    addRow();
  });

  checkState();
}

export default {
  init,
};