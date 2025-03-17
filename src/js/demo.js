const demo = () => 'Webpack Boilerplate v5.18.0 - SASS/PostCSS, ES6/7, browser sync.';

// eslint-disable-next-line no-console
console.log(demo());

window.addEventListener('scroll', function () {
  var scrolled = window.scrollY;
  var parallax = document.querySelector('.parallax');
  if (parallax) {
    var coords = scrolled * -0.3 + 'px';
    parallax.style.backgroundPositionY = coords;
  }
});
