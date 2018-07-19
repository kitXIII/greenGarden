import $ from 'jquery';
// import { findIndex } from 'lodash';

const slider = () => {
  const rootClass = 'headerSlider';
  const itemClass = 'headerSlider__item';
  const activeClass = 'headerSlider__item-active';
  const interval = 10000;

  const handler = () => {
    $(`.${rootClass}`).each(function () {
      const $collection = $(this).find(`.${itemClass}`);
      const size = $collection.length;
      // const currentIndex = findIndex($collection, elem => elem.classList.contains(activeClass));
      const currentIndex = Array.prototype.reduce.call($collection, (acc, elem, index) => {
        if (elem.classList.contains(activeClass)) {
          return index;
        }
        return acc;
      }, -1);
      const nextIndex = (currentIndex + 1) % size;

      $($collection[currentIndex]).removeClass(activeClass);
      $($collection[nextIndex]).addClass(activeClass);
    });
  };

  setInterval(handler, interval);
};

export default slider;
