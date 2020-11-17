import {createAboutTripTemplate} from "./view/trip-info.js";
import {createTripControlsTemplate} from "./view/trip-controls.js";

const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const pageHeader = document.querySelector(`.page-header`);
const tripMainElement = pageHeader.querySelector(`.trip-main`);
const tripControlsElement = pageHeader.querySelector(`.trip-main__trip-controls`);

render(tripMainElement, createAboutTripTemplate(), `afterbegin`);
render(tripControlsElement, createTripControlsTemplate(), `afterbegin`);
