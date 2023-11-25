import { getRandomIndex, debounce } from './utils.js';
import { renderGallery } from './gallery.js';

const MAX_RANDOM_FILTER = 10;
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

let currentFilter = FilterEnum.DEFAULT;

const filterElement = document.querySelector('.img-filters');
const filtersFormElement = filterElement.querySelector('.img-filters__form');
const filterDefaultButtonElement = filterElement.querySelector('#filter-default');
const filterRandomButtonElement = filterElement.querySelector('#filter-random');
const filterDiscussedButtonElement = filterElement.querySelector('#filter-discussed');


const filterHandlers = {
  [FilterEnum.DEFAULT]: (photoData) => photoData,

  [FilterEnum.RANDOM]: (photoData) => {
    const randomIndexList = [];

    const max = Math.min(MAX_RANDOM_FILTER, photoData.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, photoData.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => photoData[index]);

  },

  [FilterEnum.DISCUSSED]: (photoData) => [...photoData].sort((item1, item2) =>
    item2.comments.length - item1.comments.length
  ),
};


const repaint = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const filterData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filterData);

    const activeButtonClass = 'img-filters__button--active';
    filtersFormElement.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
    evt.target.classList.add(activeButtonClass);

    currentFilter = filter;
  }
};


const debounceRepaint = debounce((event, filter, data) => {
  repaint(event, filter, data);
});

const handleFilterClick = (event, filter, data) => {
  debounceRepaint(event, filter, data);

  const activeButtonClass = 'img-filters__button--active';
  filtersFormElement.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
  event.target.classList.add(activeButtonClass);
};


const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');

  filterDefaultButtonElement.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.DEFAULT, data);
  });

  filterRandomButtonElement.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.RANDOM, data);
  });

  filterDiscussedButtonElement.addEventListener('click', (event) => {
    handleFilterClick(event, FilterEnum.DISCUSSED, data);
  });
};


export { initFilter };
