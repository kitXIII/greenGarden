import $ from 'jquery';

const carusel = () => {
  const rootClass = 'carusel';
  const listClass = 'carusel__list';
  const itemClass = 'carusel__item';
  const controlClass = 'carusel__control';
  const controlClassLeft = 'carusel__control-left';
  const controlClassRight = 'carusel__control-right';
  const itemWidth = '257px';
  const itemPaddingLeft = '14px';

  const getSetHandler = (elem, handler) => () => elem.addEventListener('click', handler);

  const caruselHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.target.removeEventListener('click', caruselHandler);
    setTimeout(getSetHandler(e.target, caruselHandler), 500);

    const $this = $(e.target);

    if (!$this.hasClass(controlClassLeft) && !$this.hasClass(controlClassRight)) {
      return;
    }

    const direction = $this.hasClass(controlClassLeft) ? 'left' : 'right';
    const $list = $this.closest(`.${rootClass}`).find(`.${listClass}`);
    let $elem;
    switch (direction) {
      case 'right':
        $elem = $list.find(`.${itemClass}`).eq(0);
        $elem.animate({ marginLeft: `-${itemWidth}`, paddingLeft: '0px' });
        setTimeout(() => {
          $elem.detach();
          $elem.appendTo($list);
          $elem.animate({ marginLeft: '0px', paddingLeft: `${itemPaddingLeft}` });
        }, 500);
        break;
      case 'left':
        $elem = $list.find(`.${itemClass}:last-child`).eq(0);
        $elem.css({ marginLeft:  `-${itemWidth}`, paddingLeft: '0px' });
        $elem.detach();
        $elem.prependTo($list);
        $elem.animate({ marginLeft: '0px', paddingLeft: `${itemPaddingLeft}` });
        break;
      default:
    }
  };
  Array.prototype.forEach
    .call(document.querySelectorAll(`.${controlClass}`), el => el.addEventListener('click', caruselHandler));
};

export default carusel;
