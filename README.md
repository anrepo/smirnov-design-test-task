# smirnov-design-test-task

На случай если со сборкой возникнут трудности, в директории `build` лежит уже собранный проект.

NodeJS v.16.20.2

## Установка зависимостей

```
npm i
```

## Запуск в режиме разработки

```
gulp
```

## Сборка проекта

```
gulp build
```

## Описание

Разметка выполнена на шаблонизаторе Pug. Файлы разделены и собираются в один файл `build\index.html`

Стилизация выполнена на препроцессоре Scss. Файлы разделены и собираются в один файл `build\css\styles.css`

JavaScript разделён на модули и собирается при помощи **webpack** в один файл `build\js\scripts.js`. Для удобства проверки лучше использовать **основной функциональный файл** `src\js\modules\table.js`

* Pug (HTML): `src\pug\pages\home.pug`
* Scss (CSS): `src\scss\_base.scss`
* JavaScript: `src\js\modules\table.js` (оcновной файл)
