let toggleIsOpen, selectedTheme;

function overlay(msg) {
   const overlayElement = document.getElementById('overlay');
   if(!overlayElement.opened) {
    overlayElement.style.display = "block"
    setTimeout(()=>overlayElement.style.opacity = "9",150)
    overlayElement.innerHTML = msg
    setTimeout(()=>{
      overlayElement.style.background = ' rgb(0,0,0,0.6)'
      overlayElement.style.margin = "0"
      overlayElement.style.height = "100vh"
      overlayElement.style.width = "100%"
      },50)
   overlayElement.opened = true
 } else {
    setTimeout(()=>overlayElement.style.opacity = "0",60)
    setTimeout(()=>{
      overlayElement.style.margin = "100px"
      overlayElement.style.height = "50vh"
      overlayElement.style.width = "100%"
      overlayElement.innerHTML = ""
      },50)
    setTimeout(()=>overlayElement.style.display = "none",200)
   overlayElement.opened = false
 }
}
function contextmenu(event, content) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const contextmenu = document.getElementById('contextmenu');
   event.preventDefault()
   contextmenu.style.display='block';
   setTimeout(() =>contextmenu.style.opacity=9,10)
   contextmenu.innerHTML = content
   contextmenu.style.left = mouseX - contextmenu.clientWidth / 2 + 'px';
   contextmenu.style.top = mouseY - contextmenu.clientHeight / 2 + 'px';
   toggleIsOpen = true
}
function hideContextMenu() {
  const contextmenu = document.getElementById('contextmenu');
   contextmenu.style.opacity='0';
   setTimeout(() =>contextmenu.style.display='none',2)
   contextmenu.innerHTML = ''
   toggleIsOpen = false
}
function commentInterface (comments) {
  overlay(`<div class='container' style='margin: 0; text-align: center; min-height: 100vh'><div id='commentContent'>${comments? comments.map(infos=>`<div class='comment'>
      <div class='infos'>
        <img src='http://localhost:8080/api/v3/get/midia/avatars/${infos.user.avatar}' class="userAvatar">
        <h3 class='userName'>${infos.user.username}</h3>
        <div class='date'>${infos.date}</div>
        <i class='fa fa-ellipsis'></i>
        </div>
        ${infos.content}
        </div>`).join(" ") : `<br><br><br><br><img src='images/startToComment.webp' class='bodyImg'><h2 class='title'>start to react</h2>start a news interactions, reacts and ideas.`}</div>
        </div>
        <div style='position: fixed; bottom: 0; padding: 10px; width: 99%; background: #212121'><input type='text' class='textbox' placeholder='comment everthing!'> <i class='sendIcon icon-send'></i></div>
        `)
}
let db = {
  set: async function set(collection, struct, post) {
let res = await fetch("http://localhost:8080/api/v3/get/infos", {
      headers: {
        Authorization:"KAdm " + pkay,
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       type:"set",
       post: post,
       name: collection,
       struct: struct
     })
    }).then(x=>x.json())
   return res
  },
  update: async function update(collection, path, value, post) {
  let res = await fetch("http://localhost:8080/api/v3/actions", {
      headers: {
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       action: 'database',
       type: "update",
       collection,
       path: [path, value],
       isPost: post
     })
    }).then(x=>x.json())
   return res
  },
  get: async function get(collection, post) {
let res = await fetch("http://localhost:8080/api/v3/get/infos/" + collection, {
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*",
        'Cache-Control': 'max-age=500'
      },
     cache: "default",
     method:"GET"
    }).then(x=>x.json())
  if(res.status!==200) return res.message
  else return res
  },
  search: async function get(collection) {
    let res = await fetch("http://localhost:8080/api/v3/get/infos/search?q=" + collection, {
          headers: {
            "Content-Type":"application/json",
            "Access-Control-Allow-Origin": "*",
            'Cache-Control': 'max-age=500'
          },
         cache: "default",
         method:"GET"
        }).then(x=>x.json())
      if(res.status!==200) return res.message
      else return res.data
      },
  all: async function all(post) {
let res = await fetch("http://localhost:8080/api/v3/actions", {
      headers: {
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin": "*"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
      action:"database",
      type: "all",
      isPost: post
     })
    }).then(x=>x.json())
  if(res.status!==200) return res.message
    return res.data
  }
}

function generateToken(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

document.addEventListener("click", (e) => {
  var button = e.which || e.button;
  if (button === 1) {
    hideContextMenu()
  }
});
let themeCount = 0, immersiveThemeCount = -1
window.onkeyup = function (e) {
  if (e.keyCode === 27 && toggleIsOpen) return hideContextMenu()
  if (e.keyCode === 39 && document.getElementsByClassName('selectThemeBox')[0].style.display == 'block') {
      themeCount = themeCount + 1
      if(themeCount>6 || immersiveThemeCount) { 
        immersiveThemeCount = immersiveThemeCount + 1
        themeCount = 0;
        if(immersiveThemeCount>4) {
          themeCount = 0;
          immersiveThemeCount = -1;
          return setTheme(0);
        }
         selectedTheme = 'im' + immersiveThemeCount
         return setTheme(null,immersiveThemeCount);
      }
      selectedTheme = themeCount
      setTheme(themeCount)
    }
  if (e.keyCode === 13 && document.getElementsByClassName('selectThemeBox')[0].style.display == 'block') {
    document.getElementsByClassName('selectThemeBox')[0].style.opacity = 0
    setTimeout(()=>document.getElementsByClassName('selectThemeBox')[0].style.display = 'none',200);
    user.theme = selectedTheme
    db.update(user.email, "theme", selectedTheme)
  }
  if (e.keyCode === 27 && document.getElementsByClassName('selectThemeBox')[0].style.display == 'block') {
    document.getElementsByClassName('selectThemeBox')[0].style.opacity = 0
    return setTimeout(()=>document.getElementsByClassName('selectThemeBox')[0].style.display = 'none',200);
  }
  if (e.keyCode === 27 && imageSelected) {
    waitingResolveChanges = document.getElementById('overlay').innerHTML;
    overlay()
    return setTimeout(()=>overlay(`<div class='container inOverlay'><h2 class='title'>Wait!</h2>has changes no salved, you we need save?<div onclick="returnToSettings()" class='button'>yes, return</div><div onclick="overlay()" class='button gray'>no</div></div>`,true),200)
  }
  if (e.keyCode === 27 && !imageSelected && document.getElementsByClassName('configurationBox')[0]) overlay()
  if (e.keyCode === 27 && document.getElementById('playerOverlay').opened) closeMiniPlayer()
  if (e.keyCode === 80 && !document.getElementById('miniPlayer').opened && audio.src) setMiniPlayer()
  if (e.keyCode === 27 && (document.getElementById('overlay').opened && (document.getElementById('commentContent')) ||  document.getElementById('overlay').opened)) overlay();
}