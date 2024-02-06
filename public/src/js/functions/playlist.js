  function viewOwnerOfPlaylist() {
    overlay(`<div class='container inOverlay'><h2 class='title'>search configuration</h2>the search </div>`)
  }
  function musicPlaylistOptions(event, music, position) {
   contextmenu(event, `<h2 class='title'>${music.title} #${position}</h2>
   <div class='card simple'><i class='icon-trash danger'></i>remove<span></span></div>
   <div class='card simple'><i class='icon-no-vision'></i> hide ${music.title}<span></span></div>
   <div class='card simple'><i class='icon-position'></i> change position<span></span></div></div>`)
  }
  async function openPlaylist(playlist) {
   const content = document.getElementById('content');
   const icons = [];
   const musicsOfPlaylist = [];
   content.innerHTML = `LOADING...`
   let results = "<div class='button addButton'><i class='icon-plus'></i>&ensp;add musics</div><img src='/images/emptyPlaylists.webp' class='bodyImg'><h2 class='title'>no musics here...</h2>looks like no have songs in this playlist.";
   if(playlist.musics.length>0) {
     let posts = await db.all(true);
     console.log(posts)
     posts.map(x=>{
       if(playlist.musics.find(h=>h===x.id)) musicsOfPlaylist.push(x)
     })
   results = await Promise.all(musicsOfPlaylist.map(async(x, i=0)=>{
   const authorOfPost = await db.get(x.by)
   return `<div class='playlist-music-box' oncontextmenu='musicPlaylistOptions(event, ${JSON.stringify(x)}, ${i++})' id='${i++}'><img src='http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}' crossorigin='anonymous'><div class='informations'><h3 class='song-name'>${x.title}</h3>3 minutes - By ${authorOfPost.user.username}</div></div>`
   }))
   }
   if(playlist.musics.length>0) icons.push(`<div class='manipulateOptions' title='suffle queue sequence'><i class='icon-shuffle'></i></div>`)
   icons.push(`<div class='manipulateOptions' title='playlist liberty'><i class='icon-flag'></i></div>`)
   if(playlist.by===user.identifier) icons.push(`<div class='manipulateOptions' title='your own playlist'><i class='icon-copy-playlist'></i></div>`)
   if(playlist.public) icons.push(`<div class='manipulateOptions' title='public playlist'><i class='icon-global'></i></div>`)      
   content.innerHTML = `<div class='playlist'>
         ${playlist.musics.length>0? `<img class='playlistBackground' src='http://localhost:8080/api/v3/get/media/thumbnails/${musicsOfPlaylist[0].thumbnail}' crossorigin='anonymous'>` : `<img class='playlistBackground' src='/images/playlistBanner.webp'>`}
         <h2 class='playlist-title'>${playlist.name}</h2>
         ${playlist.musics.length>1? "<div class='button'>Play</div>" : ""}
         ${icons.map(x=>x).join(' ')}
         <hr>
         ${results}
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
   else db.update(user.email, "playlists." + position, user.playlists);
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
  async function addMusicToPlaylist(playlistPosition, musicId) {
    const playlistForEdit = user.playlists[playlistPosition]
    playlistForEdit.musics.push(musicId)
    db.update(user.email, 'playlists.' + playlistPosition + '.musics', playlistForEdit.musics);
    hideContextMenu()
  }