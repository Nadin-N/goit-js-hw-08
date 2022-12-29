import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorageService from './helper';
const { saveToLS, loadFromLS } = localStorageService;

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

let videoPlaybackTime;

function onPlay(event) {
  videoPlaybackTime = event.seconds;
  saveToLS(LOCAL_STORAGE_KEY, videoPlaybackTime);
  return videoPlaybackTime;
}

player
  .setCurrentTime(loadFromLS(LOCAL_STORAGE_KEY))
  .then(function (seconds) {
    console.log(`відновлення відтворення з ${seconds} секунди`);
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
