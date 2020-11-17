'use strict';

// container = место куда вставляем разметку; content = text разметки; position = определяет позицию добавляемого элемента относительно элемента, вызвавшего метод. =
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
}
