var flip = false,
   pause = "M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28",
   play = "M11,10 L17,10 17,26 11,26 M20,10 L26,10 26,26 20,26",
   $animation = $('#animation');

$(".ytp-play-button").on('click', function() {
   flip = !flip;
   $animation.attr({
      "from": flip ? pause : play,
      "to": flip ? play : pause
   }).get(0).beginElement();
});

const audioPlayerContainer = document.getElementById('audio-player-container');
const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentTimeContainer = document.getElementById('current-time');
let raf = null;
const playIconContainer = document.getElementById('play-icon');
let playState = 'play';



const calculateTime = (secs) => {
   const minutes = Math.floor(secs / 60);
   const seconds = Math.floor(secs % 60);
   const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
   return `${minutes}:${returnedSeconds}`;
 }

 const whilePlaying = () => {
   seekSlider.value = Math.floor(audio.currentTime);
   currentTimeContainer.textContent = calculateTime(seekSlider.value);
   audioPlayerContainer.style.setProperty('--seek-before-width', `${seekSlider.value / seekSlider.max * 100}%`);
   raf = requestAnimationFrame(whilePlaying);
 }

 const displayDuration = () => {
   durationContainer.textContent = calculateTime(audio.duration);
 }

 const setSliderMax = () => {
   seekSlider.max = Math.floor(audio.duration);
}
 
 if (audio.readyState > 0) {
   displayDuration();
   setSliderMax();
 } else {
   audio.addEventListener('loadedmetadata', () => {
     displayDuration();
     setSliderMax();
   });
 }

 const seekSlider = document.getElementById('seek-slider');



if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax();
  });
}





playIconContainer.addEventListener('click', () => {
   if(playState === 'play') {
     audio.play();
     requestAnimationFrame(whilePlaying);
     playState = 'pause';
   } else {
     audio.pause();
     cancelAnimationFrame(raf);
     playState = 'play';
   }
 });

 

 audio.addEventListener('timeupdate', () => {
   seekSlider.value = Math.floor(audio.currentTime);
 });

 seekSlider.addEventListener('input', () => {
   currentTimeContainer.textContent = calculateTime(seekSlider.value);
   if(!audio.paused) {
     cancelAnimationFrame(raf);
   }
 });
 
 seekSlider.addEventListener('change', () => {
   audio.currentTime = seekSlider.value;
   if(!audio.paused) {
     requestAnimationFrame(whilePlaying);
   }
 });



