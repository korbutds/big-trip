import AbstractView from "./abstract.js";

const createTripFiltersItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `
    <div class="trip-filters__filter">
      <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value=${type} ${currentFilterType === type ? `checked` : ``} ${count === 0 || currentFilterType === `disabled` ? `disabled` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
    </div>`;
};

const createTripFiltersTemplate = (filterItems, currentFilterType) => {
  const filterItemTemplate = filterItems
                              .map((filter) => createTripFiltersItemTemplate(filter, currentFilterType))
                              .join(``);
  return `<div>
            <h2 class="visually-hidden">Filter events</h2>
            <form class="trip-filters" action="#" method="get">
              ${filterItemTemplate}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>
          </div>`;
};

export default class TripFilters extends AbstractView {
  constructor(filter, currentFilterType) {
    super();

    this._filter = filter;
    this._currentFilterType = currentFilterType;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createTripFiltersTemplate(this._filter, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
