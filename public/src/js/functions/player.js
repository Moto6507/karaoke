const audio = new Audio()
let loadedAudio, isLooping;
  audio.crossOrigin = "anonymous"
  audio.volume = 1
  audio.preload = "auto"
  async function play(songFile) {
    if(!loadedAudio && !audio.src || (audio.src && audio.src !== 'http://localhost:8080/api/v3/get/media/songs/' + songFile) && songFile) return audio.src = 'http://localhost:8080/api/v3/get/media/songs/' + songFile
    if(audio.paused) audio.play()
    else audio.pause()
  }
  
function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60);
      var  seconds_int = length - minutes * 60;
  if(seconds_int < 10){
    seconds_int = "0"+seconds_int;
  }
  if(minutes < 10){
    minutes = "0"+minutes;
  }
      var seconds_str = seconds_int.toString();
       var  seconds = seconds_str.substr(0, 2);
        var time = minutes + ':' + seconds;
//console.info(seconds_int)
    return time
}
function loop(el) {
  isLooping = isLooping? false : true;
  el.style.transform = isLooping? 'rotate(360deg)' : 'rotate(0deg)'
  el.style.opacity = isLooping? 9 : 0.5
}
function seek(e) {
    if(!audio || !audio.currentTime) return;
   const progress = document.getElementsByClassName('bar')[0]
   const progressIn = audio.duration * (e/progress.clientWidth)
   audio.currentTime = Number(progressIn.toString()) 
  }

function playerDebug() {
  overlay(`<div class='container inOverlay'><h2 class='title'>player debug</h2></div>`)
}

function closeLyricsPopUp() {
  const lyricsBox = document.getElementsByClassName('lyricsBox')[0];
  const lyrics = document.getElementById('lyrics');
    lyricsBox.style.opacity = 0
    lyricsBox.style.display = 'none'
    lyrics.innerHTML = 'Lyrics'
  }
function openLyricsPopUp() {
  const lyricsBox = document.getElementsByClassName('lyricsBox')[0];
  const lyrics = document.getElementById('lyrics');
  lyricsBox.style.display = 'block'
  lyricsBox.style.opacity = 0.6
  lyrics.innerHTML = 'Lyrics'
}

function lyricsAllScreen() {
  closeLyricsPopUp()
  overlay(`<div class='container inOverlay' style='background: none'><h2 style='transition: .2s' id='lyrics'class='title'>lyrics full screen!<br><div style='color: rgb(255,255,255,0.5);'>on ${currentSong.title}, stream on <i class='icon-karaoke'></i></div></h2></div>`)
  isLyricsOnFullScreen = true
  const overlayEl = document.getElementsByClassName('inOverlay')[0]
  if(overlayEl.requestFullscreen) {
    overlayEl.requestFullscreen()
  }
}