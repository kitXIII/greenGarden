import $ from 'jquery';

const details = () => {
  const rootClass = 'reasons';
  const itemClass = 'reasons__item';
  const controlClass = 'reasons__btn';
  const activeClass = 'reasons__item-active';

  const detailsHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const $this = $(e.target);

    if (!$this.hasClass(controlClass)) {
      return;
    }

    const $currentItem = $this.closest(`.${itemClass}`).eq(0);
    const $collection = $this.closest(`.${rootClass}`).find(`.${itemClass}`);
    const itemActivation = !$currentItem.hasClass(activeClass);

    $collection.removeClass(activeClass);

    if (itemActivation) {
      $currentItem.addClass(activeClass);
    }
  };

  $(`.${controlClass}`).on('click', detailsHandler);
};

export default details;
