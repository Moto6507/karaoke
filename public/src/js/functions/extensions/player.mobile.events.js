let liricle = new Liricle(), loadedLyrics;
audio.oncanplaythrough = () => {
  loadedAudio = true
  }
audio.ontimeupdate = () => {
    const progressBar = document.getElementsByClassName('progress-bar')[0]
    if(progressBar) {
    const progressIn = audio.currentTime * (document.getElementsByClassName('bar')[0]?.offsetWidth / audio.duration)
    progressBar.style.width = progressIn + "px"
    }
    var length = audio.duration;
    var countSeconds = parseInt(audio.currentTime % 60)
    var countMinutes = parseInt((audio.currentTime / 60) % 60)
    if(countSeconds < 10) countSeconds = `0${countSeconds}`
    if(countMinutes < 10) countMinutes = `0${countMinutes}`
     document.getElementById('duration').innerHTML = countMinutes + ":" + countSeconds;
     document.getElementsByClassName('duration')[0].innerHTML = countMinutes + ":" + countSeconds;
     document.getElementsByClassName('duration')[1]? document.getElementsByClassName('duration')[1].innerHTML = calculateTotalValue(audio.duration) : ''
     if(settings.get("audio")?.filter && !kamper.nodesIsConnected){
      kamper.connect()
      kamper.filter.type = settings.get("audio")?.filter
    }
    if(settings.get("audio")?.filter !== kamper.filter.type) kamper.filter.type = settings.get("audio")?.filter
     if(!loadedLyrics) {
      liricle.load({ text: lyrics })
      loadedLyrics = true
    }
    if(loadedLyrics && lyrics) liricle.sync(audio.currentTime, false)
    }

audio.onplay = () => {
    const playIcon = [].slice.call(document.getElementsByClassName('playIcon'))
    if(!playIcon) return;
    playIcon.map(x=>{
    x.classList.remove('icon-play')
    x.classList.add('icon-pause')
    })
    document.title = "playing " + currentSong.title
    const shortcutIcon = ['disc.png','karaoke.png','singging.png','band.webp']
    changeFavicon('/assets/' + shortcutIcon[randomInt(1, 4)])
  }
  audio.onpause = () => {
    const playIcon = [].slice.call(document.getElementsByClassName('playIcon'))
    if(!playIcon) return;
    playIcon.map(x=>{
    x.classList.remove('icon-pause')
    x.classList.add('icon-play')
    })
  }
  audio.onended = () => {
    if(isLooping) {
      audio.currentTime = 0
      audio.play()
      return;
    }
    if(currentSection) skip()
    setTimeout(() => {
      if(document.getElementById('miniPlayer').opened && audio.paused) stop()
    }, 5000);
}
  liricle.on('sync',(line)=> {
    const lyrics = document.getElementById('lyrics');
    if(!lyrics) return;
    lyrics.style.opacity = 0
    setTimeout(() => {
     lyrics.innerHTML = line.text
     lyrics.style.opacity = 9
    }, 200);
 })
