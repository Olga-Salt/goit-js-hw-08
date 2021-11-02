import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
let LOCALSTORAGE_KEY = 'videoplayer-current-time';
const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);

player.on('timeupdate', throttle(onTimeGet, 1000));

function onTimeGet() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(LOCALSTORAGE_KEY, seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setTime() {
  if (currentTime) {
    player.setCurrentTime(currentTime).catch(function (error) {
      console.log(error);
    });
    localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
window.addEventListener('DOMContentLoaded', setTime);
