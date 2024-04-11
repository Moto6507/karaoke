audio.ontimeupdate = () => {
    /*const progressBar = [].slice.call(document.getElementsByClassName('progress-bar'))
    progressBar.map((x,i=0)=>{
    const progressIn = audio.currentTime * (document.getElementsByClassName('bar')[i++].offsetWidth / audio.duration)
    x.style.width = progressIn + "px"
    })*/
    var length = audio.duration;
    var countSeconds = parseInt(audio.currentTime % 60)
    var countMinutes = parseInt((audio.currentTime / 60) % 60)
    if(countSeconds < 10) countSeconds = `0${countSeconds}`
    if(countMinutes < 10) countMinutes = `0${countMinutes}`
     document.getElementById('duration').innerHTML = countMinutes + ":" + countSeconds;
     document.getElementsByClassName('duration')[0].innerHTML = countMinutes + ":" + countSeconds;
     document.getElementsByClassName('duration')[1]? document.getElementsByClassName('duration')[1].innerHTML = calculateTotalValue(audio.duration) : ''
}

audio.onplay = () => {
    const playIcon = [].slice.call(document.getElementsByClassName('playIcon'))
    if(!playIcon) return;
    playIcon.map(x=>{
    x.classList.remove('icon-play')
    x.classList.add('icon-pause')
    })
  }
  audio.onpause = () => {
    const playIcon = [].slice.call(document.getElementsByClassName('playIcon'))
    if(!playIcon) return;
    playIcon.map(x=>{
    x.classList.remove('icon-pause')
    x.classList.add('icon-play')
    })
  }