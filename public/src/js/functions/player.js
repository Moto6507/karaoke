const audio = new Audio()
let loadedAudio, isLooping;
  audio.crossOrigin = "anonymous"
  audio.volume = 1
  audio.preload = "auto"
  async function play(songFile) {
    if(!loadedAudio && !audio.src || (audio.src && audio.src !== 'https://kapi.loca.lt/api/v3/get/media/songs/' + songFile) && songFile) return audio.src = 'https://kapi.loca.lt/api/v3/get/media/songs/' + songFile
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

function playerDebug() {
  overlay(`<div class='container inOverlay'><h2 class='title'>player debug</h2></div>`)
}

function closeLyricsPopUp() {
  const lyricsBox = document.getElementsByClassName('mainLyrics')[0];
  const lyrics = document.getElementById('lyrics');
    lyricsBox.style.opacity = 0
    lyricsBox.style.display = 'none'
    lyrics.innerHTML = 'Lyrics'
  }
function openLyricsPopUp() {
  const lyricsBox = document.getElementsByClassName('mainLyrics')[0];
  const lyrics = document.getElementById('lyrics');
  lyricsBox.style.display = 'block'
  lyricsBox.style.opacity = 9
  lyrics.innerHTML = 'Lyrics'
}

function lyricsAllScreen() {
  closeLyricsPopUp()
  overlay(`<div oncontextmenu='overlay()' class='full-lyrics'>
    <div class='logo'>Listening on Karaoke</div>
    <div class='lyricsBox'><h2 id='lyrics'>${currentSong.title} lyrics</h2></div>
    <div class='shadow'></div>
    <img src='https://kapi.loca.lt/api/v3/get/media/thumbnails/${currentSong.thumbnail}' crossorigin='anonymous'>
    </div>`)
  isLyricsOnFullScreen = true
  const overlayEl = document.getElementsByClassName('inOverlay')[0]
  if(overlayEl.requestFullscreen) {
    overlayEl.requestFullscreen()
  }
}
function stop() {
  setMiniPlayer(null, true)
  closeLyricsPopUp()
  audio.src=''
}