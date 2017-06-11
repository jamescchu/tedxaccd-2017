// JS Goes here - ES6 supported
// import Parallax from "parallax-js";
// const scene = document.getElementById('scene');
// const parallax = new Parallax(scene, {
//   scalarX: 4,
//   scalarY: 4
// });

import Barba from "barba.js";
const dom = Barba.Pjax.Dom;
dom.wrapperId = "js-wrapper";
dom.containerClass = "js-container";

document.addEventListener("DOMContentLoaded", () => {
    Barba.Pjax.init();
    Barba.Prefetch.init();

    // Scroll to the wrapper
    Barba.Dispatcher.on('transitionCompleted', () => {
        window.scrollTo(0, 0);
        initPhotoSwipeFromDOM(gallerySelector);
    });

    // Add transition to barba
    Barba.Pjax.getTransition = () => Transition;

    Barba.transitionLength = 250;
});
