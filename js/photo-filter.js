import { getRandomIndex, debounce } from './utils.js';
import { renderGallery } from './gallery.js';


const MAX_RANDOM_FILTER = 10;
const FilterEnum = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};


const filterElement = document.querySelector('.img-filters');
const filterFormElement = document.querySelector('.img-filters__form');
const filterDefaultBtnElement = filterFormElement.querySelector('#filter-default');
const filterRandomBtnElement = filterFormElement.querySelector('#filter-random');
const filterDiscussedBtnElement = filterFormElement.querySelector('#filter-discussed');
let currentFilter = FilterEnum.DEFAULT;

const filterHandlers = {
  [FilterEnum.DEFAULT]: (data) => data,

  [FilterEnum.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [FilterEnum.DISCUSSED]: (data) => [...data].sort((item1, item2) =>
    item2.comments.length - item1.comments.length
  ),
};


const repaint = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const filterData = filterHandlers[filter](data);
    const pictures = document.querySelectorAll('.picture');
    pictures.forEach((item) => item.remove());
    renderGallery(filterData);

    currentFilter = filter;
  }
};

const debounceRepaint = debounce((evt, filter, data) => {
  repaint(evt, filter, data);
});

const handleFilterClick = (evt, filter, data) => {
  debounceRepaint(evt, filter, data);

  const activeButtonClass = 'img-filters__button--active';
  filterFormElement.querySelector(`.${activeButtonClass}`).classList.remove(activeButtonClass);
  evt.target.classList.add(activeButtonClass);
};


const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  filterDefaultBtnElement.addEventListener('click', (evt) => {
    handleFilterClick(evt, FilterEnum.DEFAULT, data);
  });

  filterRandomBtnElement.addEventListener('click', (evt) => {
    handleFilterClick(evt, FilterEnum.RANDOM, data);
  });

  filterDiscussedBtnElement.addEventListener('click', (evt) => {
    handleFilterClick(evt, FilterEnum.DISCUSSED, data);
  });
};

export { initFilter };
