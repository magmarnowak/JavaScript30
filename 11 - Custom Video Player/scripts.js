/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function updateToggle() {
    video.paused ? toggle.innerHTML = '||' : toggle.innerHTML = '►';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function changeRange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const currentProgress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${currentProgress}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggle);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('pause', updateToggle);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(slider => slider.addEventListener('change', changeRange));
ranges.forEach(slider => slider.addEventListener('mousemove', changeRange));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);