import Abstract from "./abstract.js";

const createTripLoading = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class TripLoading extends Abstract {
  getTemplate() {
    return createTripLoading();
  }
}
