const audio = new Audio()
let loadedAudio, isLooping;
  audio.crossOrigin = "anonymous"
  audio.volume = 1
  audio.preload = "auto"
  async function play(songFile) {
    if(!loadedAudio && !audio.src || (audio.src && audio.src !== 'https://kapi.loca.lt/api/v3/get/media/songs/' + songFile) && songFile) audio.src = 'https://kapi.loca.lt/api/v3/get/media/songs/' + songFile
    if(audio.paused) audio.play()
    else audio.pause()
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

  function lyricsAllScreen() {
    overlay(`<div oncontextmenu='overlay()' class='full-lyrics'>
    <div class='logo'>Listening on Karaoke</div>
    <div class='lyricsBox'><h3 id='lyrics'>${currentSong.title} lyrics</h3></div>
    <div class='shadow'></div>
    <img src='https://kapi.loca.lt/api/v3/get/media/thumbnails/${currentSong.thumbnail}' crossorigin='anonymous'>
    </div>`)
    isLyricsOnFullScreen = true
  }