// JS Goes here - ES6 supported
// import Parallax from "parallax-js";
// const scene = document.getElementById('scene');
// const parallax = new Parallax(scene, {
//   scalarX: 4,
//   scalarY: 4
// });

import Barba from "barba.js";

// const links = document.querySelectorAll('a[href]');
// const cbk = e => {
//  if(e.currentTarget.href === window.location.href) {
//    e.preventDefault();
//    e.stopPropagation();
//  }
// };
//
// for(let i = 0; i < links.length; i++) {
//   links[i].addEventListener('click', cbk);
// }

const dom = Barba.Pjax.Dom;
dom.wrapperId = "js-wrapper";
dom.containerClass = "js-container";

Barba.Pjax.start();
Barba.Prefetch.init();
Barba.Dispatcher.on('transitionCompleted', () => {
  document.getElementById("id__menu-state").checked = false;
});

// document.addEventListener("DOMContentLoaded", () => {
//     Barba.Pjax.init();
//     Barba.Prefetch.init();
//
//     // Scroll to the wrapper
//     Barba.Dispatcher.on('transitionCompleted', () => {
//         window.scrollTo(0, 0);
//     });
//
//     // Add transition to barba
//     Barba.Pjax.getTransition = () => Transition;
//
//     Barba.transitionLength = 250;
// });
