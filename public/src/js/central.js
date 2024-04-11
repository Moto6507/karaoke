let toggleIsOpen, selectedTheme, loader = ` <div class='loader'></div>
<div class='loader' style="--delay: 0.1s"></div>
<div class='loader' style="--delay: 0.2s"></div>
<div class='loader' style="--delay: 0.3s"></div>
<div class='loader' style="--delay: 0.4s"></div>`, themeCount = 0, immersiveThemeCount = -1;

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
      document.body.style.overflow='hidden'
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
    document.body.style.overflow=''
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
  if(!contextmenu) return;
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
        <div style='position: fixed; bottom: 0; padding: 10px; width: 99%; background: #212121; transition: height .2s'><div id='commentOption'></div><input type='text' class='textbox' onkeyup='collectComments(this,event)' placeholder='comment everthing!'> <i id='sendBtn' style='transition: .2s; opacity: 0.5' onclick='comment()' class='sendIcon icon-send'></i></div>
        `)
}
let db = {
  set: async function set(collection, struct, post) {
let res = await fetch("https://kapi.loca.lt/api/v3/actions", {
      headers: {
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
      action: 'database',
      type: "insert",
      collection,
      path: struct,
      isPost: post
     })
    }).then(x=>x.json())
   return res
  },
  update: async function update(collection, path, value, post) {
  let res = await fetch("https://kapi.loca.lt/api/v3/actions", {
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
    if(post) {
      const posts = await db.all(true);
      const collected = [];
      posts.map(h=>Object.values(h).map(x=>{
        if(x===collection) collected.push(h)
      }))
      return collected
    }
   let res = await fetch("https://kapi.loca.lt/api/v3/get/infos/" + collection + "?post=" + post, {
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
    let res = await fetch("https://kapi.loca.lt/api/v3/get/infos/search?q=" + collection, {
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
let res = await fetch("https://kapi.loca.lt/api/v3/actions", {
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
let settings = {
  set: (path, value) => {
  let curr = {
    audio: {},
    debug: {},
    audioEqualizer: {},
    accessibility: {},
    security: {},
    lyrics: {},
    language: "EN"
  }
  if(localStorage.getItem('settings')) curr = JSON.parse(localStorage.getItem('settings'))
  if(curr[path]) {
   curr[path][Object.keys(value)[0]] = value[Object.keys(value)[0]]
  } else {
   curr[path] = value
  }
  return localStorage.setItem('settings', JSON.stringify(curr))
},
  has: (item) => {
    const data = JSON.parse(localStorage.getItem(item));
    const keys = Object.keys(data) || []
    if(!keys.find(x=>x===item)) return false;
    return true
  },
  clearSettings: () => localStorage.clear(),
  clear: () => localStorage.clear(),
  get: (item) => {
    const data = JSON.parse(localStorage.getItem("settings")) || {}
    if(!item) return data
    if(!data || !data[item]) return false
    return data[item]
  }
}
function gerateId() {
  let token = '';
  for (let i = 0; i < 16; i++) {
      const digitoAleatorio = Math.floor(Math.random() * 10);
      token += digitoAleatorio;
  }
  return token;
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
function cardChangeSelect(element) {
  const elements = [].slice.call(document.getElementsByClassName('select'))
  elements.map(x=>{
    x.classList.remove('selected')
  })
  element.classList.add('selected')
}

async function gerateNotification(message, userIdentifier) {
  const user = await db.get(userIdentifier);
  let { notifications, email } = user.user
  notifications.push(message)
  db.update(email, "notifications", notifications);
}
Array.prototype.shuffle = function() {
  let currentIndex = this.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [this[currentIndex], this[randomIndex]] = [this[randomIndex], this[currentIndex]]
  }
}