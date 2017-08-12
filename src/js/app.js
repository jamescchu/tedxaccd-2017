// JS Goes here - ES6 supported

import Barba from "barba.js";
// import Headroom from "./headroom.min.js";
// import Rellax from "./rellax.js";

const dom = Barba.Pjax.Dom;
dom.wrapperId = "js--wrapper";
dom.containerClass = "js--container";

function initMap() {
  var locationACCD = {lat: 34.168871, lng: -118.185157};
  var map = new google.maps.Map(document.getElementById('js--map'), {
    zoom: 17,
    center: locationACCD,
    gestureHandling: 'cooperative',
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: locationACCD,
    map: map,
    title: 'ArtCenter College of Design'
  });
};

function loadMap() {
  if (window.location.href.indexOf("venue") != -1) {
    initMap()
  }
};

window.onload  = () => {
  Barba.Pjax.start();
  Barba.Prefetch.init();
  loadMap();
};
Barba.Dispatcher.on('transitionCompleted', () => {
  // document.getElementById("id__menu-state").checked = false;
  if ( isNavVisible(navMenu) ) {
    navMenu.classList.remove('nav--active');
  }
  _setMetrics();

  if (window.location.href.indexOf("venue") != -1) {

    initMap()
  }
});
const logotype = document.getElementById("js--logotype");

const menuIcon = document.getElementById("js--menu-icon");
const navMenu = document.getElementById("js--nav");

// grab an element
var header = document.querySelector("header");
// construct an instance of Headroom, passing the element
// var headroom  = new Headroom(header, {
//   tolerance: {
//     up: 10,
//     down: 5
//   },
//   classes: {
//     inital: "header",
//     pinned: "header--hide",
//     unpinned: "header--show",
//     top: "header--top",
//     notTop: "header--offset",
//     bottom: "header--btm",
//     notBottom: "header--float"
//   },
//   onUnpin: function() {
//     logotype.classList.add('logotype--scrolled');
//     progressBar.classList.remove('logotype__progress--scrolled');
//     push.classList.remove('logotype__progress--scrolled');
//     if ( isNavVisible(navMenu) ) {
//       this.elem.classList.remove(this.classes.unpinned);
//       this.elem.classList.add(this.classes.pinned);
//       logotype.classList.remove('logotype--scrolled');
//       progressBar.classList.add('logotype__progress--scrolled');
//       push.classList.add('logotype__progress--scrolled');
//     }
//     else {
//       this.elem.classList.add(this.classes.unpinned);
//       this.elem.classList.remove(this.classes.pinned);
//     }
//   },
//   onPin: function() {
//     logotype.classList.remove('logotype--scrolled');
//     progressBar.classList.add('logotype__progress--scrolled');
//     push.classList.add('logotype__progress--scrolled');
//
//   }
// });
// initialise
//headroom.init();

function isNavVisible(nav) {
  return ( nav.classList.contains('nav--active') ? true : false );
}

menuIcon.onclick = function() {

    navMenu.classList.toggle("nav--active");
}

// Define barba properties
Barba.transitionLength = 250;

// Define transition
var Transition = Barba.BaseTransition.extend({
  start: function() {
    this.newContainerLoading.then(this.runTransition.bind(this));
  },

  runTransition: function() {

    document.body.style.overflow = 'hidden';

    ////////////////////////////
    // Setup
    ////////////////////////////
    var transitionLength = parseInt(Barba.transitionLength),
        transitionTimeout = 100,
        transitionLengthSeconds = (transitionLength / 1000) + 's',
        transitionSelector = 'data-transition';
    ////////////////////////////

    // Set the animation time on all elements
    var allAnimationElements = document.querySelectorAll('[' + transitionSelector + ']');
    for (var i = 0; i < allAnimationElements.length; i++) {
      element = allAnimationElements[i];

      // Set styles
      element.style.animationDuration = transitionLengthSeconds;
      element.style.animationDelay = transitionLengthSeconds;
      element.style.animationName = element.dataset.transition;
      element.style.animationFillMode = 'forwards';
    }

    // Get all old elements with transitions
    var oldElements = this.oldContainer.querySelectorAll('[' + transitionSelector + ']');
    for (var i = 0; i < oldElements.length; i++) {
      var element = oldElements[i];

      // Remove style tag
      element.removeAttribute('style');
    }

    // Trigger out transitions
    setTimeout(function(){

      for (var i = 0; i < oldElements.length; i++) {
        element = oldElements[i];

        // Set styles
        element.style.animationDuration = transitionLengthSeconds;
        element.style.animationDelay = '0s';
        element.style.animationName = element.dataset.transition;
        element.style.animationFillMode = 'forwards';
        element.style.animationDirection = 'reverse';
      }

    }, transitionTimeout);

    var x = this;
    function done(x) {

      // Remove old container and add new one
      x.oldContainer.style.visibility = 'hidden';
      x.newContainer.style.visibility = 'visible';

      // Remove style tag at the end of the animation
      setTimeout(function(){
        document.body.style.overflow = 'visible';
        for (var i = 0; i < allAnimationElements.length; i++) {
          element = allAnimationElements[i];
          element.removeAttribute('style');
        }
      }, transitionLength);

      // Scroll to top
      document.body.scrollTop = 0;

      // Done
      x.done();

    }

    // Mark as done
    setTimeout(function(){
      done(x);
    }, transitionLength + transitionTimeout);

  }
});

// Add transition to barba
Barba.Pjax.getTransition = function() {
  return Transition;
};

const progressBar = document.getElementById("js--progress");
// const trackContent = document.querySelector("body");
const push = document.getElementById("js--push");
const body = document.body;
push.style.marginLeft = 0;
progressBar.style.width = '0%';
// window.onscroll = function(event) {
//   const pageHeight = window.innerHeight;
//   const adjustedHeight = trackContent.clientHeight - pageHeight;
//   const progress = ((window.pageYOffset / adjustedHeight) * 100);
//
//   console.log(pageHeight);
//
//   progressBar.style.width = `${progress}%`;
//   push.style.marginLeft = `${progress}%`;
// }

let progress = 0;
let endPoint;

var _setProgress = () => {
    ticking = false;
    try {
        const y = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        progress = y / endPoint * 100;
        if (progress > 0 && isMobileDevice()) {
          progressBar.style.width = `${progress}%`;
          push.style.marginLeft = `${progress}%`;
        } else {
          progressBar.style.width = `${progress}%`;
          push.style.marginLeft = `${progress}%`;
        }
    } catch (e) {
        console.error(e);
    }
};

var _setMetrics = () => {
    endPoint = _getEndPoint();
    _setProgress();
};

var _getEndPoint = () => body.scrollHeight - (window.innerHeight || document.documentElement.clientHeight);

_setMetrics();
window.addEventListener('scroll', onScroll, false);
window.addEventListener('resize', _setMetrics, false);

var ticking = false;

function requestTick() {
	if(!ticking) {
		requestAnimationFrame(_setProgress);
	}
	ticking = true;
}
// window.onscroll = () => {_setProgress()};
// window.onresize = () => {_setMetrics()};

function onScroll() {
  requestTick();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
