import carusel from './carusel';
import slider from './slider';
import details from './details';

export default () => {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('It. works!');
    carusel();
    slider();
    details();
  });
};
