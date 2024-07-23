const audio = document.getElementById('audioPlayer');

const songList = [
{
  fileName: 'Sunshine in the Rain.mp3',
  songTitle: 'Sunshine in the Rain - Shania Yan',
  albumPhoto: 'Sunshine in the Rain-album.jpg'
}, {
  fileName: 'YOASOBI アイドル.mp3',
  songTitle: 'アイドル - YOASOBI',
  albumPhoto: 'idol-album.jpg'
}, {
  fileName: 'Never Gonna Give Up -Rick Astley.mp3',
  songTitle: 'Never Gonna Give Up - Rick Astley',
  albumPhoto: 'rick.jpg'
}, { 
  fileName: 'YOASOBI ハルカ.mp3',
  songTitle: 'ハルカ - YOASOBI',
  albumPhoto: 'yosobi1.jpg'
}, {
  fileName: 'Lao Shu Ai Da Mi.mp3',
  songTitle: 'Lao Shu Ai Da Mi',
  albumPhoto: 'Lao Shu Ai Da Mi.jpg'
},  {
  fileName: 'Endless Love - Jackie Chan & Kim Hee Son.mp3',
  songTitle: 'Endless Love - Jackie Chan & Kim Hee Son',
  albumPhoto: 'Endless Love.jpg'
}, {
  fileName: 'Billie Eilish, Khalid - lovely.mp3',
  songTitle: 'Billie Eilish, Khalid - lovely',
  albumPhoto: 'lovely.jpg'
}];

let songIndex = 0;

function playSong(index) {
  audio.src = songList[index].fileName;
  displayTitle(index);
  displaPhoto(index)
  audio.play();
};

const nextButton = document.getElementById('next');

nextButton.addEventListener('click', () => {
  currentSongIndex = (songIndex + 1) % songList.length;
  songIndex = currentSongIndex;
  if (songIndex > songList.length) {
    songIndex = 0;
  }
  isPlaying = true;
  renderPlayPauseButton()
  playSong(currentSongIndex);
});

document.getElementById('volumeControl').addEventListener('input', (e) => {
  audio.volume = e.target.value;
  document.getElementById('volume').innerHTML = `${Math.floor(e.target.value * 100)}%`
});

const progressBar = document.getElementById('progressBar');
const time = document.getElementById('time');

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  const currentTime = audio.currentTime;
  progressBar.value = progress;

  let currentTimeSecond = convertSecond(currentTime);
  let currentTimeMinute = convertMinute(currentTime);

  let totalMinute = convertMinute(audio.duration);
  let totalSecond = convertSecond(audio.duration);

  currentTimeSecond = String(currentTimeSecond).padStart(2, '0');

  totalSecond = String(totalSecond).padStart(2, '0');

  renderTime(currentTimeMinute, currentTimeSecond, totalMinute, totalSecond);
});

function renderTime(currentTimeMinute, currentTimeSecond, totalMinute, totalSecond) {
  time.innerHTML = `${currentTimeMinute}:${currentTimeSecond} / ${totalMinute}:${totalSecond}`
}

function convertSecond(time) {
  return Math.floor(time % 60);
};

function convertMinute(time) {
  return Math.floor(time / 60);
};

function displayTitle(index) {
  document.getElementById('songTitle').innerHTML = songList[index].songTitle;
}

function displaPhoto(index) {
  document.getElementById('albumPhoto').innerHTML = `<img class="album-img" src="${songList[index].albumPhoto}" alt="album image">`;
}

displayTitle(songIndex);
displaPhoto(songIndex);

let isAutoPlay = false;

let autoPlayButton = document.getElementById('autoPlay')

function renderAutoPlayIcon() {
  if (isAutoPlay === false) {
    autoPlayButton.innerHTML = `<img src="autoplay-inactive.png" alt="autoplay-inactive">`
  } else {
    autoPlayButton.innerHTML = `<img src="autoplay-active.png" alt="autoplay-inactive">`
  }
};

autoPlayButton.addEventListener('click', () => {
  if (isAutoPlay === false) {
    isAutoPlay = true;
    renderAutoPlayIcon()
  } else {
    isAutoPlay = false;
    renderAutoPlayIcon()
  }
});

renderAutoPlayIcon();

audio.addEventListener('ended', () => {
  if (isAutoPlay === true) {
    nextButton.click()
  }
});

progressBar.addEventListener('input', () => {
  const duration = audio.duration;
  audio.currentTime = (progressBar.value / 100) * duration;
});

let isPlaying = false;

function renderPlayPauseButton() {
  if (isPlaying === false) {
    document.getElementById('play-pause').innerHTML = '<img src="play-icon.png" alt="play-icon">'
  } else {
    document.getElementById('play-pause').innerHTML = '<img src="pause-icon.png" alt="pause-icon">'
  };
};

renderPlayPauseButton()

document.getElementById('play-pause').addEventListener('click', () => {
  if (isPlaying === false) {
    audio.play();
    isPlaying = true;
    renderPlayPauseButton();
  } else {
    audio.pause();
    isPlaying = false;
    renderPlayPauseButton();
  }
});
