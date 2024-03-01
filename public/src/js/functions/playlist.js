const changeMusicPosition = (musicId, musicPosition, playlistPosition) => overlay(`<div class='container inOverlay'><h2 class='title'>change position</h2>select position song to change the position.${user.playlists[playlistPosition].musics.map((x,i=0)=>{
  const position = i++ + 1;
  console.log(musicId, musicPosition, playlistPosition)
  return `<div class='card select ${user.playlists[playlistPosition].musics.findIndex(x=>x==musicId)===position - 1? 'selected' : ''}'
  onclick="cardChangeSelect(this) \n ${musicPosition!==position - 1? `selectMusicPosition(${musicPosition}, ${position}, ${playlistPosition})` : ''}">
  <i class='icon-music'></i> #${position}<span></span></div>`
}).join('')}</div>`);
  function viewOwnerOfPlaylist() {
    overlay(`<div class='container inOverlay'><h2 class='title'>search configuration</h2>the search </div>`)
  }
  function musicPlaylistOptions(event, music, position, playlistPosition) {
    const playlistMusicsLength = user.playlists[playlistPosition].musics.length
    contextmenu(event, `<h2 class='title'>${music.title} #${position}</h2>
   <div class='card simple' onclick="removeSongFromPlaylist('${music.id}', ${playlistPosition})"><i class='icon-trash danger'></i>remove<span></span></div>
   <div class='card simple' ${playlistMusicsLength<0? "style='opacity: 0.5'" : ''}><i class='icon-no-vision'></i> hide ${music.title}<span></span></div>
   <div class='card simple' ${playlistMusicsLength<0? "style='opacity: 0.5'" : `onclick="changeMusicPosition('${music.id}', ${user.playlists[playlistPosition].musics.findIndex(x=>x===music.id)}, ${playlistPosition})"`}><i class='icon-position'></i> change position<span></span></div></div>`)
  }
  async function removeSongFromPlaylist(musicId, playlistPosition) {
    const playlistForEdit = user.playlists[playlistPosition];
    playlistForEdit.musics.splice(playlistForEdit.musics.findIndex(x=>x===musicId),1)
    db.update(user.email, 'playlists.' + playlistPosition + '.musics', playlistForEdit.musics)
    openPlaylist(playlistForEdit)
  }
  async function selectMusicPosition(positionToChange, newPosition, playlistPosition) {
    document.getElementsByClassName('inOverlay')[0].innerHTML = `${loader}<h2 class='title'>changing...</h2>`
    const playlist = user.playlists[playlistPosition];
    playlist.musics.splice(newPosition - 1, 0, playlist.musics.splice(positionToChange, 1)[0])
    db.update(user.email, 'playlists.' + playlistPosition + '.musics', playlist.musics)
    overlay()
    openPlaylist(user.playlists[playlistPosition])
  }
  async function openPlaylist(playlist) {
   const content = document.getElementById('content');
   const icons = [];
   let firstSong;
   const playlistPosition = user.playlists.findIndex(x=>x.id===playlist.id)
   content.innerHTML = `${loader}<h2 class='title'>loading...</h2>loading playlist for you..`
   let results = "<div class='button addButton'><i class='icon-plus'></i>&ensp;add musics</div><img src='/images/emptyPlaylists.webp' class='bodyImg'><h2 class='title'>no musics here...</h2>looks like no have songs in this playlist.";
   if(playlist.musics.length>0) {
     let posts = await db.all(true);
   results = await Promise.all(playlist.musics.map(async(x, i=0)=>{
   x = await posts.find(y=>y.id===x)
   if(!firstSong) firstSong = x
   const authorOfPost = await db.get(x.by)
   return `<div class='playlist-music-box' oncontextmenu='musicPlaylistOptions(event, ${JSON.stringify(x)}, ${i++}, ${playlistPosition})'><img src='http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}' crossorigin='anonymous'><div class='informations'><h3 class='song-name'>${x.title}</h3>3 minutes - By ${authorOfPost.user.username}</div></div>`
   }))
   results = results.join('')
   }
   if(playlist.musics.length>0) icons.push(`<div class='manipulateOptions' title='suffle queue sequence'><i class='icon-shuffle'></i></div>`)
   icons.push(`<div class='manipulateOptions' title='playlist liberty'><i class='icon-flag'></i></div>`)
   if(playlist.by===user.identifier) icons.push(`<div class='manipulateOptions' title='your own playlist'><i class='icon-copy-playlist'></i></div>`)
   if(playlist.public) icons.push(`<div class='manipulateOptions' title='public playlist'><i class='icon-global'></i></div>`)      
   content.innerHTML = `<div class='playlist'>
         ${playlist.musics.length>0? `<img class='playlistBackground' src='http://localhost:8080/api/v3/get/media/thumbnails/${firstSong.thumbnail}' crossorigin='anonymous'>` : `<img class='playlistBackground' src='/images/playlistBanner.webp'>`}
         <h2 class='playlist-title'>${playlist.name}</h2>
         ${playlist.musics.length>1? "<div class='button'>Play</div>" : ""}
         ${icons.map(x=>x).join(' ')}
         <hr>
         ${results}
         <br><br><br><br>
         </div>`
  }
  async function createPlaylist(t) {
    const content = document.getElementById('content');
    user.playlists.push({
      "name": t.value,
      "id": generateToken(13),
      "musics": [],
      "forks": 0,
      "public": false,
      "by": user.identifier
    })
    db.update(user.email, "playlists", user.playlists);
    content.innerHTML = "loading..."
    changeTab(document.getElementsByClassName('route')[4],'library')
    if(document.getElementById('overlay').opened) overlay()
   }
  async function deletePlaylist(position) {
   const content = document.getElementById('content');
   user.playlists.splice(position, 1);
   if(user.playlists.length<1) db.update(user.email, "playlists", []);
   else db.update(user.email, "playlists", user.playlists);
   content.innerHTML = "loading..."
   changeTab(document.getElementsByClassName('route')[4],'library')
  }
  async function editPlaylist(playlistPosition) {
    const playlistForEdit = user.playlists[playlistPosition]
    overlay(`<div class='container inOverlay'><h1 class='title'>editing ${playlistForEdit.name}</h1>
    <input type='text' placeholder='${playlistForEdit.name}' onkeypress='if(event.keyCode===13) setNameOfPlaylist(${playlistPosition}, this.value)' class='textbox'>
    <div class='card simple' onclick='publicPlaylist(${playlistPosition})'><i class='icon-global'></i> turn playlist ${playlistForEdit.public? 'private': 'public'} <i class='icon-right'></i></div>
    <div class='card simple' onclick='overlay() \n deletePlaylist(${playlistPosition})'><i class='icon-trash danger'></i> delete playlist<i class='icon-right'></i></div>
    `)
  }
  async function publicPlaylist(playlistPosition) {
    const playlistForEdit = user.playlists[playlistPosition]
    user.playlists[playlistPosition].public = playlistForEdit.public? false : true;
    db.update(user.email, 'playlists.' + playlistPosition + '.public', playlistForEdit.public? false : true);
    overlay()
    changeTab(document.getElementsByClassName('route')[4],'library')
  }
  async function setNameOfPlaylist(playlistPosition, newName) {
    const playlistForEdit = user.playlists[playlistPosition]
    user.playlists[playlistPosition].name = newName
    db.update(user.email, 'playlists.' + playlistPosition + '.name', newName);
    overlay()
    changeTab(document.getElementsByClassName('route')[4],'library')
  }
  async function selectPlaylist(id) {
    hideContextMenu()
    overlay(`<div class='container inOverlay'><h2 class='title'>select playlist</h2>
    ${user.playlists.map((x,i=0)=>`<div class='card' ${x.musics.find(x=>x===id)? "style='opacity: 0.5'" : `onclick="addMusicToPlaylist(${i++}, '${id}')"`}><i class='icon-library'></i> ${x.name}<i class='icon-right'></i></div>`).join(' ')}go to <a class='link'>library</a> to manage your playlists`)
  }
  async function addMusicToPlaylist(playlistPosition, musicId) {
    const playlistForEdit = user.playlists[playlistPosition]
    playlistForEdit.musics.push(musicId)
    db.update(user.email, 'playlists.' + playlistPosition + '.musics', playlistForEdit.musics);
    overlay()
  }