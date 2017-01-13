const player = document.querySelector('.player');
const video = player.querySelector('video');
const skipButtons = player.querySelectorAll('[data-skip]');
const playButton = player.querySelector('.player__button.toggle');
const ranges = player.querySelectorAll('[type=range]');
const progress = player.querySelector('.progress');
const progressbar = player.querySelector('.progress__filled');
const fullscreen = player.querySelector('.fullscreen');

// Play and pause
const togglePlay = function () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
};

const updateButton = function () {
    playButton.innerHTML = this.paused ? '►' : '❚ ❚';
};

// Skip buttons
const skip = function () {
    video.currentTime += parseFloat(this.dataset.skip);
};

const handleRangeUpdate = function () {
    video[this.name] = this.value;
};

const handleProgress = function () {
    const percent = video.currentTime / video.duration * 100;
    progressbar.style.flexBasis = `${percent}%`;
};

let mousedown = false;
const scrub = function (e) {
    const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
    video.currentTime = scrubTime;
};

const goFullscreen = function () {
    video.webkitEnterFullscreen();
};

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
playButton.addEventListener('click', togglePlay);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
fullscreen.addEventListener('click', goFullscreen);