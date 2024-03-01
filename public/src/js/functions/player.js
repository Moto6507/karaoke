const audio = new Audio()
let loadedAudio, isLooping;
  audio.crossOrigin = "anonymous"
  audio.volume = 1
  audio.preload = "auto"
  function play(songFile) {
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