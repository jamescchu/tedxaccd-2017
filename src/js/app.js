import Barba from 'barba.js'
// import Headroom from "./headroom.min.js";
// import Rellax from "./rellax.js";
// import ScrollTrigger from "./ScrollTrigger.js";
import AOS from './aos.js'
import MoveTo from './moveTo.js'
import VanillaModal from 'vanilla-modal'
import Plyr from 'plyr'

const moveTo = new MoveTo()
const dom = Barba.Pjax.Dom
const plyr = Plyr

dom.wrapperId = 'js--wrapper'
dom.containerClass = 'js--container'
Barba.Pjax.ignoreClassLink = 'pjax--disable'

function refreshLoad() {
  window.scrollTo(0, 0);
  setMetrics()
  loadMap()

  const triggerMove = document.getElementsByClassName('js--trigger')

  plyr.setup({
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'fullscreen',
    ],
  })

  for (let i = 0; i < triggerMove.length; i++) {
    moveTo.registerTrigger(triggerMove[i])
  }
  if (window.location.href.includes('#promo')) {
    modal.open('#promo')
  } else if (location.pathname == '/') {
    const modal = new VanillaModal({
      clickOutside: true,
    })
    downIcon.classList.add('show-icon')
    downIcon.classList.remove('hide-icon')
  } else {
    downIcon.classList.remove('show-icon')
    downIcon.classList.add('hide-icon')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Barba.Pjax.start()
  Barba.Prefetch.init()
  AOS.init()

  //refreshLoad();
})

Barba.Dispatcher.on('newPageReady', () => {
  if (isNavVisible(navMenu)) {
    navMenu.classList.remove('nav--active')
    menuIcon.classList.remove('is-active')
  }
})

Barba.Dispatcher.on('transitionCompleted', () => {
  // document.getElementById("id__menu-state").checked = false;
  AOS.refresh()

  refreshLoad()
})
const logotype = document.getElementById('js--logotype')

const menuIcon = document.getElementById('js--menu-icon')
const navMenu = document.getElementById('js--nav')

const upIcon = document.getElementById('js--up-icon')
const downIcon = document.getElementById('js--down-icon')

// grab an element
const header = document.querySelector('header')

let stuck = false
const stickPoint = getDistance()

function getDistance() {
  const topDist = logotype.offsetTop
  return topDist
}

function scrollSwitch() {
  ticking = false
  const distance = getDistance() - window.pageYOffset
  const offset = window.pageYOffset
  if (distance <= 0 && !stuck) {
    logotype.classList.add('logotype--scrolled')
    upIcon.classList.add('show-icon')
    upIcon.classList.remove('hide-icon')
    if (location.pathname == '/') {
      downIcon.classList.add('hide-icon')
    }
    stuck = true
  } else if (stuck && offset <= stickPoint) {
    logotype.classList.remove('logotype--scrolled')
    upIcon.classList.remove('show-icon')
    upIcon.classList.add('hide-icon')
    if (location.pathname == '/') {
      downIcon.classList.add('show-icon')
      downIcon.classList.remove('hide-icon')
    }
    stuck = false
  }
}

function isNavVisible(nav) {
  return nav.classList.contains('nav--active') ? true : false
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle('is-active')
  navMenu.classList.toggle('nav--active')
}

function initMap() {
  const locationACCD = { lat: 34.168871, lng: -118.185157 }
  const map = new google.maps.Map(document.getElementById('js--map'), {
    zoom: 17,
    center: locationACCD,
    gestureHandling: 'cooperative',
    scrollwheel: false,
  })
  const marker = new google.maps.Marker({
    position: locationACCD,
    map,
    title: 'ArtCenter College of Design',
  })
}

function loadMap() {
  if (window.location.href.includes('venue')) {
    initMap()
  }
}

// Define barba properties
Barba.transitionLength = 250

// Define transition
const Transition = Barba.BaseTransition.extend({
  start() {
    this.newContainerLoading.then(this.runTransition.bind(this))
  },

  runTransition() {
    document.body.style.overflow = 'hidden'

    ////////////////////////////
    // Setup
    ////////////////////////////
    const transitionLength = parseInt(Barba.transitionLength)

    const transitionTimeout = 100
    const transitionLengthSeconds = `${transitionLength / 1000}s`
    const transitionSelector = 'data-transition'
    ////////////////////////////

    // Set the animation time on all elements
    const allAnimationElements = document.querySelectorAll(
      `[${transitionSelector}]`
    )
    for (var i = 0; i < allAnimationElements.length; i++) {
      element = allAnimationElements[i]

      // Set styles
      element.style.animationDuration = transitionLengthSeconds
      element.style.animationDelay = transitionLengthSeconds
      element.style.animationName = element.dataset.transition
      element.style.animationFillMode = 'forwards'
    }

    // Get all old elements with transitions
    const oldElements = this.oldContainer.querySelectorAll(
      `[${transitionSelector}]`
    )
    for (var i = 0; i < oldElements.length; i++) {
      var element = oldElements[i]

      // Remove style tag
      element.removeAttribute('style')
    }

    // Trigger out transitions
    setTimeout(() => {
      for (let i = 0; i < oldElements.length; i++) {
        element = oldElements[i]

        // Set styles
        element.style.animationDuration = transitionLengthSeconds
        element.style.animationDelay = '0s'
        element.style.animationName = element.dataset.transition
        element.style.animationFillMode = 'forwards'
        element.style.animationDirection = 'reverse'
      }
    }, transitionTimeout)

    const x = this
    function done(x) {
      // Remove old container and add new one
      x.oldContainer.style.visibility = 'hidden'
      x.newContainer.style.visibility = 'visible'

      // Remove style tag at the end of the animation
      setTimeout(() => {
        document.body.style.overflow = 'visible'
        for (let i = 0; i < allAnimationElements.length; i++) {
          element = allAnimationElements[i]
          element.removeAttribute('style')
        }
      }, transitionLength)

      // Scroll to top
      document.body.scrollTop = 0

      // Done
      x.done()
    }

    // Mark as done
    setTimeout(() => {
      done(x)
    }, transitionLength + transitionTimeout)
  },
})

// Add transition to barba
Barba.Pjax.getTransition = () => Transition

const progressBar = document.getElementById('js--progress')
// const trackContent = document.querySelector("body");
const push = document.getElementById('js--push')
const body = document.body
push.style.marginLeft = 0
progressBar.style.width = '0%'

let progress = 0
let endPoint

const setProgress = () => {
  ticking = false
  try {
    const y =
      window.scrollY || window.pageYOffset || document.documentElement.scrollTop
    progress = y / endPoint * 100
    if (progress >= 100) {
      progress = 100
    }
    if (progress <= 0 ) {
      progress = 0
    }
    progressBar.style.width = `${progress}%`
    push.style.marginLeft = `${progress}%`
  } catch (e) {
    console.error(e)
  }
}

var setMetrics = () => {
  endPoint = getEndPoint()
  requestTick()
}

var getEndPoint = () => 
  body.scrollHeight - (window.innerHeight || document.documentElement.clientHeight)

setMetrics()
window.addEventListener('scroll', onScroll, false)
window.addEventListener('resize', setMetrics, false)

var ticking = false

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(setProgress)
    requestAnimationFrame(scrollSwitch)
  }
  ticking = true
}
// window.onscroll = () => {_setProgress()};
// window.onresize = () => {_setMetrics()};

function onScroll() {
  requestTick()
}
