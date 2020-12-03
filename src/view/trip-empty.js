import AbstractView from "./abstract.js";

const createBlunkList = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class BlunkList extends AbstractView {
  getTemplate() {
    return createBlunkList();
  }
}
