import $ from 'jquery';
import { findIndex } from 'lodash';

const slider = () => {
  const rootClass = 'headerSlider';
  const itemClass = 'headerSlider__item';
  const activeClass = 'headerSlider__item-active';
  const interval = 10000;

  const handler = () => {
    $(`.${rootClass}`).each(function () {
      const $collection = $(this).find(`.${itemClass}`);
      const size = $collection.length;
      const currentIndex = findIndex($collection, elem => elem.classList.contains(activeClass));
      const nextIndex = (currentIndex + 1) % size;

      $($collection[currentIndex]).removeClass(activeClass);
      $($collection[nextIndex]).addClass(activeClass);
    });
  };

  setInterval(handler, interval);
};

export default slider;
