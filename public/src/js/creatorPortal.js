let 
  tabToChange,
  mainSaved,
  thumbnail,
  lyricsExtracted,
  songObject = {
      "title": "",
      "id": "",
      "keywords": "",
      "stars": 0, 
      "by": user.identifier,
      "listeners": 0, 
      "comments": [],
      "albumParticipation": null, 
      "musicFile": "", 
      "thumbnail": "",
      "lyrics": "",
      "gender": "" 
    },
  audio = new Audio(),
  srcName = (text) => {
    const songNameElement = document.getElementsByClassName('songTitle')[0];
    songNameElement.innerHTML = text
    songObject.title = text;
    enablePost();
  },
  srcThumbnail = (e) => {
    const songThumbnail = document.getElementsByClassName('musicThumbnail')[0];
    if(!e.files[0]) return;
    const reader = new FileReader();
      reader.onload=()=> {
       songThumbnail.src = reader.result;
       thumbnail = reader.result;
       songThumbnail.style.opacity = 9;
       songEspecifications('linked thumbnail ' + e.files[0].name);
       songObject.thumbnail = gerateId();
       enablePost();
     }
       if(e.files[0]) reader.readAsDataURL(e.files[0])
  },
  srcAudio = (e) => {
    const songInput = document.getElementsByClassName('select')[0];
    if(!e.files[0]) return;
    const reader = new FileReader();
      reader.onload=()=> {
       songInput.innerHTML = `<i class='icon-music'></i>${e.files[0].name}<span></span>`
       audio.src = reader.result;
       songInput.classList.add('selected')
       audio.play();
       songEspecifications('linked song file ' + e.files[0].name)
       songObject.musicFile = gerateId();
       enablePost();
     }
       if(e.files[0]) reader.readAsDataURL(e.files[0])
  },
  srcLyrics = (e) => {
    const songInput = document.getElementsByClassName('select')[1];
    if(!e.files[0]) return;
    const reader = new FileReader();
      reader.onload=()=> {
       songInput.innerHTML = `<i class='icon-music'></i>${e.files[0].name}<span></span>`
       songInput.onclick = function(event) {
        event.preventDefault()
        viewLyrics()
       };
       lyricsExtracted = reader.result;
       songEspecifications('linked lyrics file ' + e.files[0].name)
       songInput.classList.add('selected')
     }
       if(e.files[0]) reader.readAsText(e.files[0])
  },
  songEspecifications = (linkedOption) => {
    const especificationBox = document.getElementById('especifications');
    especificationBox.innerHTML += `<div class='card'><i class='icon-check'></i> ${linkedOption}<span></span></div>`
  },
  viewLyrics = () => {
    overlay(`<div class='container inOverlay'><img src='/images/lyrics.webp' class='bodyImg'><h2 class='title'>lyrics</h2>${lyricsExtracted}</div>`)
  },
  enablePost = () => {
    const { title, thumbnail, musicFile, gender } = songObject;
    const button = document.getElementsByClassName('button')[0]
    if(title && thumbnail && musicFile && gender) {
      button.setAttribute('onclick','postSong');
      button.classList.remove('grey')
      return;
    }
    button.setAttribute('onclick','');
    button.classList.add('grey')

  }

function changeTab(element, tabToChange) {
    const content = document.getElementById('content')
    const routes = [].slice.call(document.getElementsByClassName('route'));
    const blocked = () => {
     routes[1].style.animation='.2s shake linear'
      setTimeout(() => routes[1].style.animation='',200);
    }
    if(thumbnail) return blocked()
    routes.map(x=>{
      if(x.href) return;
      if(tabToChange!=='main') x.style.opacity='0.5'
      else x.style.opacity='9'
    }) 
    element.style.opacity='9'
    openTab = tabToChange
    if(!mainSaved) mainSaved = content.innerHTML
    switch(openTab) {
      case 'main': content.innerHTML = mainSaved
        break;
      case 'post': {
        content.innerHTML = `
        <img src='/images/band.webp' class="bodyImg">
        <h2 class='title'>Make a Post</h2>
        it's very gratifying that you decide to post your art!
        <hr>
        <br>
        <label for='background'>
        <img src='/images/confuse.webp' class='musicThumbnail'>
        </label>
        <h1 class='songTitle'></h1>
        <div style='text-align: left; padding-left: 20px'>
        <h3 class='title'>title</h3>
        <input type='text' onkeyup='srcName(this.value)' placeholder='title...' class='textbox'>
        <br><h3 class='title'>keywords</h3>
        <input type='text' onkeyup="songObject.keywords = this.value \n enablePost()" placeholder='use , to separate' class='textbox'>
        keywords helps with song visibility, NOT use random keywords to turn more song more visibily
        <h3 class='title'>gender</h3>
        <select class='selectBox' onchange="songEspecifications('linked gender to ' + this.value) \n songObject.gender = this.value \n enablePost()">
        <option value='rock'>rock</option>
        <option value='jazz'>jazz</option>
        <option value='all'>no gender</option>
        </select>
        <br>
        <h3 class='title'>song file</h3>
        <label for='songFile'>
        <div class='card select'><i class='icon-music'></i>select song file<span></span></div>
        </label>
        <div id='finishSong'></div>
        <h3 class='title'>song lyrics</h3>
        <label for='songLyrics'>
        <div class='card select'><i class='icon-music'></i>select song lyrics file<span></span></div>
        </label>
        <h3 class='title'>song especifications</h3>
        <div id='especifications'></div>
        <hr>
        <div class='button grey' onclick='postTheSong()'>post</div>
        </div>
        <input type='file' id='background' onclick="document.getElementsByClassName('musicThumbnail')[0].style.opacity=0.5" accept='image/png' onchange='srcThumbnail(this)'><br>
        <input type='file' id='songFile' accept='audio/mpeg' onchange='srcAudio(this)'><br>
        <input type='file' id='songLyrics' accept='text/plain' onchange='srcLyrics(this)'><br>
        `
      }
        break;
    }
}
audio.onended = () => {
  const finishElement = document.getElementById('finishSong');
  finishElement.innerHTML = `<div class='button' onclick="audio.play() \n this.style.display = 'none'">play again</div>`
}
async function postTheSong() {
  overlay(`<div class='container inOverlay' id='postageContainer'>${loader}<h2 class='title'>loading...</h2>collecting data, and performing...`)
  const posts = await db.all(true), userPosts = [];
  posts.map(x=>{
    if(x.by===user.identifier) userPosts.push(x)
  });
  document.getElementById("postageContainer").innerHTML = `<div class='progressBox'><span id='progress'></span></div><h2 class='title'>downloading...</h2>downloading images, texts and audio... This action is not to slow on any time... Can be long...`
  setTimeout(()=>document.getElementById('progress').style.width='100%',1000)
  setTimeout(()=>{
    document.getElementById("postageContainer").innerHTML = `<img src='/images/cosmetics.webp' class='bodyImg'><h2 class='title'>cosmetics</h2>setting some cosmetics...`
  setTimeout(()=>{
    document.getElementById("postageContainer").innerHTML = `<div class='finishCircle'><i class='icon-check'></i></div><h2 class='title'>all done!</h2>it's all done for you listen you own song and share.`
  },800)
  },1500)
}
window.onkeyup = function (e) {
  if (e.keyCode === 27 && toggleIsOpen) return hideContextMenu()
  if (e.keyCode === 27 && document.getElementById('overlay').opened && !document.getElementById("postageContainer")) overlay()
}