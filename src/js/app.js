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
dom.wrapperId = "js--wrapper";
dom.containerClass = "js--container";

function scriptc(a,b){
  var __d=document;
  var __h = __d.getElementsByTagName("head")[0];
  var s = __d.createElement("script");
  s.setAttribute("src", a);
  s.id = b;
  __h.appendChild(s);
}

Barba.Pjax.start();
Barba.Prefetch.init();
Barba.Dispatcher.on('transitionCompleted', () => {
  // document.getElementById("id__menu-state").checked = false;
  if ( isNavVisible(navMenu) ) {
    navMenu.classList.remove('nav--active');
  }
  const js = document.getElementById("js--script-map");
  if(js != null){
    eval(js.innerHTML);
  }
});
const logotype = document.getElementById("js--logotype");
// const nav = document.getElementById("js--header");
// let scrolled = false;
// const stickPoint = getDistance();
//
// function getDistance() {
//   const topDist = nav.offsetTop + nav.offsetHeight;
//   return topDist;
// }

// window.onscroll = e => {
//   const distance = getDistance() - window.pageYOffset;
//   const offset = window.pageYOffset;
//   if (( distance <= 0) && !scrolled) {
//     logotype.classList.add('logotype--scrolled');
//     scrolled = true;
//   } else if (scrolled && (offset <= stickPoint)) {
//     logotype.classList.remove('logotype--scrolled');
//     scrolled = false;
//   }
// }


const menuIcon = document.getElementById("js--menu-icon");
const navMenu = document.getElementById("js--nav");

// grab an element
var header = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(header, {
  classes: {
    inital: "header",
    pinned: "header--hide",
    unpinned: "header--show",
    top: "header--top",
    notTop: "header--offset",
    bottom: "header--btm",
    notBottom: "header--float"
  },
  onUnpin: function() {
    logotype.classList.add('logotype--scrolled');
    if ( isNavVisible(navMenu) ) {
      this.elem.classList.remove(this.classes.unpinned);
      this.elem.classList.add(this.classes.pinned);
    }
    else {
      this.elem.classList.add(this.classes.unpinned);
      this.elem.classList.remove(this.classes.pinned);
    }
  },
  onPin: function() {
    logotype.classList.remove('logotype--scrolled');
  }
});
// initialise
headroom.init();

function isNavVisible(nav) {
  return ( nav.classList.contains('nav--active') ? true : false );
}

menuIcon.onclick = function() {

    navMenu.classList.toggle("nav--active");
}

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
