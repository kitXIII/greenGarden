import carusel from './carusel';
import slider from './slider';

export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('It. works!');
    carusel();
    slider();
  });
};
