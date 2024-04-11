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

  function openLyricsPopUp() {

  }

  function closeLyricsPopUp() {
    
  }