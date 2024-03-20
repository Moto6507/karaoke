let 
  tabToChange,
  mainSaved,
  thumbnailBase64,
  musicBase64,
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
      "genre": "" 
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
       thumbnailBase64 = reader.result;
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
       musicBase64 = reader.result;
       songInput.classList.add('selected')
       audio.play();
       songEspecifications('linked song file ' + e.files[0].name)
       songObject.musicFile = gerateId();
       enablePost();
     }
       if(e.files[0]) reader.readAsDataURL(e.files[0])
  },
  srcLyrics = (e) => {
    const songInput = document.getElementById('lyricsSelect');
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
    if(!especificationBox) return;
    especificationBox.innerHTML += `<div class='card'><i class='icon-check'></i> ${linkedOption}<span></span></div>`
  },
  viewLyrics = () => {
    overlay(`<div class='container inOverlay'><img src='/images/lyrics.webp' class='bodyImg'><h2 class='title'>lyrics</h2>${lyricsExtracted}</div>`)
  },
  enablePost = () => {
    const { title, thumbnail, musicFile, gender } = songObject;
    const button = document.getElementsByClassName('button')[0]
    if(title && thumbnail && musicFile && gender) {
      button.setAttribute('onclick','postTheSong()');
      button.classList.remove('grey')
      return;
    }
    button.setAttribute('onclick','');
    button.classList.add('grey')

  }

async function changeTab(element, tabToChange) {
    const content = document.getElementById('content')
    const routes = [].slice.call(document.getElementsByClassName('route'));
    const blocked = () => {
     routes[1].style.animation='.2s shake linear'
      setTimeout(() => routes[1].style.animation='',200);
    }
    if(thumbnailBase64) return blocked()
    routes.map(x=>{
      if(x.href) return;
      if(tabToChange!=='main') x.style.opacity='0.5'
      else x.style.opacity='9'
    }) 
    element.style.opacity='9'
    openTab = tabToChange
    if(!mainSaved) mainSaved = content.innerHTML
    switch(openTab) {
      case 'main': {
        content.innerHTML = mainSaved
        loadGeralChart();
        loadMusicChart();
      }
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
        <h3 class='title'>genre</h3>
        <select class='selectBox' onchange="songEspecifications('linked genrer to ' + this.value) \n songObject.gender = this.value \n enablePost()">
        <optgroup label='genres more listen'>
        <option value='rock'>Rock</option>
        <option value='jazz'>Jazz</option>
        <option value='pop'>Pop</option>
        <option value='hiphop'>HipHop</option>
        <option value='tecno'>Tecno</option>
        <option value='country'>Country</option>
        </optgroup>
        <optgroup label='Latino genrers'>
        <option value='samba'>Samba (Brazil)</option>
        <option value='choro'>Choro (Brazil)</option>
        <option value='funk'>Funk Carioca (Brazil)</option>
        <option value='axe'>Axé (Brazil)</option>
        <option value='tango'>Tango (Argentine/Uruguayan)</option>
        <option value='bambuco'>Bambuco (Colombian)</option>
        <option value='cumbia'>Cumbia (Colombian)</option>
        <option value='vallenatoz'>Vallenato (Colombian)</option>
        <option value='folk'>Folk musics (all latinos countries)</option>
        <option value='duruguense'>Duranguense</option>
        <option value='mariachi'>Mariachi</option>
        <option value='norteño'>Norteño</option>
        <option value='ranchera'>Ranchera</option>
        </optgroup>
        <optgroup label='Another groups'>
        <option value='karaoke'>Karaoke</option>
        <option value='soundeffect'>Sound Effect</option>
        <option value='test'>Test</option>
        <option value=''>No genre</option>
        </optgroup>
        </select>
        <br>
        <h3 class='title'>song file</h3>
        <label for='songFile'>
        <div class='card select'><i class='icon-music'></i>select song file<span></span></div>
        </label>
        <div id='finishSong'></div>
        <h3 class='title'>song lyrics</h3>
        <label for='songLyrics'>
        <div class='card select' id='lyricsSelect'><i class='icon-music'></i>select song lyrics file<span></span></div>
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
      case 'managePosts': {
        content.innerHTML = `<br><br>${loader}<h2 class='title'>loading</h2>loading the posts...`
        const posts = await db.get(user.identifier, true)
        content.innerHTML = posts.length>0? posts.map((x,i=0)=>`
        <div class="musicCard">
         <img src="http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}" crossorigin='anonymous' class="background">
         <div class='cardInfo'>
           <div class='static'><i class='icon-music'></i> ${x.listeners}</div>
           <div class='static'><i class='icon-star'></i> ${x.stars}</div>
           <h2 class='title'>${x.title}</h2><h5 class='author'>${user.username}</h5>
         </div>
        </div>
        <div class='button' style='display: inline-block; width: 200px' onclick="editSongPopUp('${x.id}')">edit</div>
        <div class='button grey' style='display: inline-block; width: 200px' onclick="overlay(\`<div class='container inOverlay'><h2 class='title'>you are sure to make it?</h2>if you continue, your post ewill not exists, it irreversible!<div class='button' onclick='deletePost(\\\`${x.id}\\\`,\\\`${i++}\\\`)'>yes</div><div class='button gray' onclick='overlay()'>no</div></div>\`)">delete</div>`).join(' ') : `<img src='/images/sound.webp' class='bodyImg'><h2 class='title'>no songs</h2>well, it looks like  you didn't post nothing...`
      }
        break;
     case 'ofYou': {
       content.innerHTML = `<img src='http://localhost:8080/api/v3/get/media/avatars/${user.avatar}' crossorigin='anonymous' style='border-radius: 1in; margin: 5px' class='bodyImg'>
       <h1 class='title'>of you</h1>
       <div class='container box'>
       <h2 class='title'>teams</h2>
       no team, you can join to a band!
       </div>
       <div class='container box'>
       <h2 class='title'>albums</h2>
       no albums...
       </div>
       `
     }
        break;
  }
}
audio.onended = () => {
  const finishElement = document.getElementById('finishSong');
  finishElement.innerHTML = `<div class='button' onclick="audio.play() \n this.style.display = 'none'">play again</div>`
}
async function deletePost(id, position) {
  document.getElementsByClassName('inOverlay')[0].innerHTML = `${loader}</div><h2 class='title'>waiting..</h2>deleting your post...</h2>`
  const posts = await db.get(user.identifier, true);
  console.log(posts)
  const postToDelete = posts.find(x=>x.id===id)
  posts.splice(position,1)
  console.log(postToDelete)
  fetch("http://localhost:8080/api/v3/actions", {
      headers: {
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       action: 'unlink',
       id: 'thumbnails/' + postToDelete.thumbnail + '.png'
     }, {
       action: 'unlink',
       id: 'lyrics/' + postToDelete.lyrics + '.lrc'
     })
    }).then(x=>x.json())
  db.set(user.email, posts, true);
  overlay();
  changeTab(document.getElementsByClassName('route')[2],'managePosts')
}
async function editSongPopUp(id) {
  const posts = await db.get(user.identifier, true);
  const post = posts.find(x=>x.id===id)
  overlay(`<div class='container inOverlay'><h2 class='title'>${post.title}</h2> 
  <label for='thumbnail'>
  <img crossorigin='anonymous' src='http://localhost:8080/api/v3/get/media/thumbnails/${post.thumbnail}' class='musicThumbnail'>
  </label>
  <div style='text-align: left; padding-left: 20px'>
  <h3 class='title'>title</h3>
  <input type='text' placeholder='new title...' class='textbox'>
  <h3 class='title'>keywords</h3>
  <input type='text' placeholder='keywords... (use , to separate)' value='${post.keywords || ''}' class='textbox'>
  <h3 class='title'>genrer</h3>
  <select class='selectBox' onchange="songEspecifications('linked genrer to ' + this.value) \n songObject.gender = this.value \n enablePost()">
  <optgroup label='genres more listen'>
  <option value='rock'>Rock</option>
  <option value='jazz'>Jazz</option>
  <option value='pop'>Pop</option>
  <option value='hiphop'>HipHop</option>
  <option value='tecno'>Tecno</option>
  <option value='country'>Country</option>
  </optgroup>
  <optgroup label='Latino genrers'>
  <option value='samba'>Samba (Brazil)</option>
  <option value='choro'>Choro (Brazil)</option>
  <option value='funk'>Funk Carioca (Brazil)</option>
  <option value='axe'>Axé (Brazil)</option>
  <option value='tango'>Tango (Argentine/Uruguayan)</option>
  <option value='bambuco'>Bambuco (Colombian)</option>
  <option value='cumbia'>Cumbia (Colombian)</option>
  <option value='vallenatoz'>Vallenato (Colombian)</option>
  <option value='folk'>Folk musics (all latinos countries)</option>
  <option value='duruguense'>Duranguense</option>
  <option value='mariachi'>Mariachi</option>
  <option value='norteño'>Norteño</option>
  <option value='ranchera'>Ranchera</option>
  </optgroup>
  <optgroup label='Another groups'>
  <option value='karaoke'>Karaoke</option>
  <option value='soundeffect'>Sound Effect</option>
  <option value='test'>Test</option>
  <option value=''>No genre</option>
  </optgroup>
  </select>
  <h3 class='title'>lyrics</h3>
  <label for='songLyrics'>
  <div class='card select ${post.lyrics? 'selected' : ''}' id='lyricsSelect'><i class='icon-music'></i> ${post.lyrics? 'linked lyrics ' + post.lyrics : 'no lyrics'}<span></span></div>
  </label>
  </div>
  <div class='button grey'>save changes</div>
  <div class='button grey' onclick='overlay()'>cancel</div>
  </div>
  <input type='file' id='thumbnail' onclick="document.getElementsByClassName('musicThumbnail')[0].style.opacity=0.5" accept='image/png' onchange='srcThumbnail(this)'><input type='file' id='songLyrics' accept='text/plain' onchange='srcLyrics(this)'><br>
  <input type='file' id='songLyrics' accept='text/plain' onchange='srcLyrics(this)'><br>`)
}

async function postTheSong() {
  overlay(`<div class='container inOverlay' id='postageContainer'>${loader}<h2 class='title'>loading...</h2>collecting data, and performing...`)
  const posts = await db.all(true), userPosts = [], lyrics = {};
  posts.map(x=>{
    if(x.by===user.identifier) userPosts.push(x)
  });
  document.getElementById("postageContainer").innerHTML = `<div class='progressBox'><span id='progress'></span></div><h2 class='title'>downloading...</h2>downloading images, texts and audio... This action is not to slow on any time... Can be long...`
  const dataToSend = {
    thumbnail: {
     file: thumbnailBase64,
     id: songObject.thumbnail
    },
    song: {
      file: musicBase64,
      id: songObject.musicFile
    }
  }
  if(lyricsExtracted) {
  songObject.lyrics = gerateId()
  dataToSend.lyrics = {}
  dataToSend.lyrics['id'] = songObject.lyrics
  dataToSend.lyrics['content'] = lyricsExtracted;
  }
  await axios.request("http://localhost:8080/api/v3/upload", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(dataToSend),
    onUploadProgress: (p) => document.getElementById('progress').style.width = p.loaded / p.total * 100 + '%'
}).then (data => {
  document.getElementById('progress').style.width = "100%"
}) 
  document.getElementById("postageContainer").innerHTML = `<img src='/images/cosmetics.webp' class='bodyImg'><h2 class='title'>cosmetics</h2>setting some cosmetics...`
  songObject.id = generateToken(16);
  userPosts.push(songObject);
  await db.set(user.email, userPosts, true)
  document.getElementById("postageContainer").innerHTML = `<div class='finishCircle'><i class='icon-check'></i></div><h2 class='title'>all done!</h2>it's all done for you listen you own song and share.<br><h3 class='title'>you can close this box.</h3>`
  document.getElementById("postageContainer").id = ''
}
window.onkeyup = function (e) {
  if (e.keyCode === 27 && toggleIsOpen) return hideContextMenu()
  if (e.keyCode === 27 && document.getElementById('overlay').opened && !document.getElementById("postageContainer")) overlay()
}