import Abstract from "../view/abstract.js";

const createStatisticTemplate = () => {
  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class TripStatistic extends Abstract {
  constructor(tasks) {
    super();

    this._tasks = tasks;
  }

  getTemplate() {
    return createStatisticTemplate(this._tasks);
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {

  }
}
