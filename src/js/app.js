// JS Goes here - ES6 supported
function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.js-days');
  const hoursSpan = clock.querySelector('.js-hrs');
  const minutesSpan = clock.querySelector('.js-mins');
  const secondsSpan = clock.querySelector('.js-secs');

  function updateClock() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = (`0${t.hours}`).slice(-2);
    minutesSpan.innerHTML = (`0${t.minutes}`).slice(-2);
    secondsSpan.innerHTML = (`0${t.seconds}`).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

const deadline = 'November 04 2017 11:00:00 GMT+0800';
initializeClock('js-timer', deadline);
