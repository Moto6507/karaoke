let 
 openTab,
 mainSaved, 
 currentSong,
 changeSearchContentFromHistory = (t) => {
  const searchContent = document.getElementById('searchContent');
  searchContent.innerHTML = ''
  document.getElementsByTagName('input')[0].value = t
 }
function addHistory(text) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  if(history.find(x=>x===text)) return;
  if(history.length>15) history.pop();
  history.push(text);
  localStorage.setItem('history', JSON.stringify(history));
}
function viewHistory(t) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  if(!t) return history.length? `<div class='button grey' onclick="localStorage.removeItem('history') \n changeTab(document.getElementsByClassName('route')[1], 'search')">clear history</div>`
  + history.map(x=>`<div class='card' onclick='changeSearchContentFromHistory("${x}")'><i class='icon-clock'></i>${x}<span></span></div>`).join(' ') : `<img class='bodyImg' src='/images/startSearch.webp'><h2 class='title'>no history</h2> start to search on karaoke.`
}
function searchHistory(t) {
  const history = JSON.parse(localStorage.getItem('history')) || [];
  const matches = [];
  const searchContent = document.getElementById('searchContent');
  history.map((x)=>{
    if(x.toLowerCase().includes(t.toLowerCase())) matches.push(x)
  })
 if(t.length < 1) return searchContent.innerHTML = viewHistory()
 return searchContent.innerHTML = matches.map(x=>`<div class='card' onclick='changeSearchContentFromHistory("${x}")'><i class='icon-clock'></i>${x}<span></span></div>`).join(' ');
}
async function search(t) {
  const searchContent = document.getElementById('searchContent');
  addHistory(t.value)
  searchContent.innerHTML = `<div class="musicCard load">
  <div class="option">
  <div class='share'></div></div>
  <span></span>
  <div class='cardInfo'>
     <div class='static'></div>
     <div class='static'></div>
     <h2 class='title'></h2><h5 class='author'></h5>
   </div>
  </div><div class="musicCard load">
  <div class="option">
  <div class='share'></div></div>
  <span></span>
  <div class='cardInfo'>
     <div class='static'></div>
     <div class='static'></div>
     <h2 class='title'></h2><h5 class='author'></h5>
   </div>
  </div><div class="musicCard load">
  <div class="option">
  <div class='share'></div></div>
  <span></span>
  <div class='cardInfo'>
     <div class='static'></div>
     <div class='static'></div>
     <h2 class='title'></h2><h5 class='author'></h5>
   </div>
  </div><div class="musicCard load">
  <div class="option">
  <div class='share'></div></div>
  <span></span>
  <div class='cardInfo'>
     <div class='static'></div>
     <div class='static'></div>
     <h2 class='title'></h2><h5 class='author'></h5>
   </div>
  </div><div class="musicCard load">
  <div class="option">
  <div class='share'></div></div>
  <span></span>
  <div class='cardInfo'>
     <div class='static'></div>
     <div class='static'></div>
     <h2 class='title'></h2><h5 class='author'></h5>
   </div>
  </div>`
  const res = await fetch("http://localhost:8080/api/v3/get/infos/search?q=" + t.value, {
    method: "GET",
    headers: {
      "Content-Type":"application/json"
    }
  }).then(x=>x.json());
  if(res.status===404) return searchContent.innerHTML = `<img src='/images/noMatches.webp' class='bodyImg'><h2 class='title'>no results for ${t.value}</h2>no have results for "${t.value}", try for keywords, titles, genders, lyrics.`
  const searchResults = await Promise.all(res.data.map(async(x)=>{
    const user = await db.get(x.by);
    return `<div class="musicCard" oncontextmenu="contextmenu(event, \`<h2 class='title'>${x.title}</h2>
    <div class='card simple' id='${x.id}' onclick='selectPlaylist(this.id)'><i class='icon-plus'></i> add music to playlist<span></span></div>\`)">
    <div class="option">
    <i class='icon-play' onclick="setMiniPlayer({ songId: '${x.id}', isPlaylist: false }) \n play('${x.musicFile}')"></i>
    <i class='icon-comment'></i> ${x.comments.length}
    </div>
     <img onclick="window.location.href='/k/player?song=${x.id}'" src="http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}" crossorigin='anonymous' class="background">
     <div class='cardInfo'>
       <div class='static'><i class='icon-music'></i> ${x.listeners}</div>
       <div class='static'><i class='icon-star'></i> ${x.stars}</div>
       <h2 class='title'>${x.title}</h2><h5 class='author'>${user.user.username}</h5>
     </div>
    </div>`
  }))
  return searchContent.innerHTML = searchResults.join(' ')
}
function changeTab(element, tabToChange) {
  const content = document.getElementById('content')
  const routes = [].slice.call(document.getElementsByClassName('route'));
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
    case 'search': {
    content.innerHTML = `<div class='container'><input type='text' placeholder='search' onkeyup='if(event.keyCode===13) search(this)' oninput='searchHistory(this.value)' class='textbox'> <i id='search' class='icon-search' oncontextmenu="contextmenu(event, \`<h2 class='title'>search settings</h2>\`)" onclick="search(document.getElementsByTagName('input')[0])"></i></div><div id='searchContent'></div>`
    document.getElementById('searchContent').innerHTML = viewHistory()
    }
    break;
    case 'explore': {
      content.innerHTML = ''
    }
    break;
    case 'notifications': {
      content.innerHTML = user.notifications? user.notifications : `<br><img src='images/noNotifications.webp' class='bodyImg'><h2 class='title'>no notifications</h2>weel, looks like no have notifications here...`
    }
    break;
    case 'library': {
      content.innerHTML = `<div class='button modern' onclick="overlay(\`<div class='container inOverlay'><h2 class='title'>new playlist</h2>enter a name of the playlist (or esc)<input type='text' class='textbox' placeholder='my songs to study' onkeypress='if(event.keyCode===13) createPlaylist(this)'></div>\`)"><i class='icon-plus'></i> new playlist<span></span></div>${user.playlists.length? user.playlists.map((x,i=0)=>{
        const position = i++
        return `<div class='button modern' oncontextmenu="contextmenu(event, \`<h2 class='title'>${x.name}</h2>
      <div class='card simple' onclick='deletePlaylist(${position})'><i class='icon-trash danger'></i>delete<span></span></div>
      <div class='card simple' onclick='editPlaylist(${position})'><i class='icon-pencil'></i>edit<span></span></div>
      <div class='card simple'><i class='icon-share-nodes'></i>share<span></span></div></div>\`)" onclick='openPlaylist(${JSON.stringify(x)})'><i class='icon-library'></i> ${x.name}<span></span></div>`
    }).join(' ') : `<img class='bodyImg' src='/images/emptyPlaylists.webp'><h2 class='title'>no midia here</h2>looks like whe dont have anthing here...`}`
    }
    break;
  }
}
function touchMiniPlayer() {
  const playerOverlay = document.getElementById('playerOverlay');
  const playerTemplate = `
<div class='player' oncontextmenu="contextmenu(event, \`<h2 class='title'>player options</h2><div class='card simple' onclick='selectTheme()'>theme<span></span></div>\`)">
<img class='thumbnail' crossorigin='anonymous' src='http://localhost:8080/api/v3/get/media/thumbnails/${currentSong.thumbnail}'>
<h1 class='title'>${currentSong.title}</h1>
<br>
<div class='options'>
<div class='bar' onclick='seek(event.offsetX)'>
<div class='progress-bar'></div>
</div>
</div>
<div class='options' style='width: 84%'>
  <div class='duration'>00:00</div>
  <div id='slash'>/</div>
  <div class='duration'>00:00</div>
</div>
<div class='options'>
<i class='icon-star icon'></i>
<i onclick='play()' class='play-button playIcon ${audio.paused? "icon-play" : "icon-pause"}'></i>
<div onclick='loop(this)' style='opacity: 0.5' class='icon'><i class='icon-loop'></i></div>
</div>
</div>
<div class='selectThemeBox'><i class='icon-music'></i>uses <i class='icon-arrow-left'></i> <i class='icon-arrow-right'></i> to change theme and <i>Enter</i> to select.</div>`
  playerOverlay.style.top = "0"
  setTimeout(()=>playerOverlay.style.opacity = 9,70)
  playerOverlay.innerHTML = playerTemplate
  setTheme(4)
  playerOverlay.opened = true
}
function closeMiniPlayer() {
  const playerOverlay = document.getElementById('playerOverlay');
  playerOverlay.style.opacity = 0
  setTimeout(()=>playerOverlay.style.top = "100%",5);
  playerOverlay.opened = false
}
function selectTheme() {
  const themeBox = document.getElementsByClassName('selectThemeBox')[0];
  themeBox.style.display='block'
  setTimeout(()=>themeBox.style.opacity=9,200)
}
async function setMiniPlayer(options) {
  const playerOverlay = document.getElementById('miniPlayer');
  if(playerOverlay.opened) {
    playerOverlay.style.bottom = '-100px'
    playerOverlay.opened = false
  return;
  }
  if(!options) {
  playerOverlay.style.bottom = '0'
  playerOverlay.opened = true
  return;
  }
  const miniPlayer = document.getElementById('miniPlayer')
  const [ songThumbnail, songTitle, skipIcons, playIcon, controls ] = [
    miniPlayer.getElementsByClassName('thumbnailOfSong')[0],
    document.getElementsByClassName('titleOfSong')[0],
    document.getElementsByClassName('skipIcons')[0],
    document.getElementsByClassName('icon-play')[0],
    document.getElementsByClassName('controls')[0]
  ]
  let song = await db.get(options.songId);
  song = song.user
  currentSong = song
  songThumbnail.src = 'http://localhost:8080/api/v3/get/media/thumbnails/' + song.thumbnail;
  songTitle.innerHTML = song.title;
  if(!options.isPlaylist) controls.innerHTML = `<i onclick='play()' class='icon-pause playIcon'></i>`
  else controls.innerHTML = `
  <div class='skipIcons'><i class='icon-skip'></i></div>
  <i class='icon-pause playIcon'></i>
  <div class='skipIcons'><i class='icon-skip'></i></div>`
  playerOverlay.style.bottom = '0'
  playerOverlay.opened = true
}