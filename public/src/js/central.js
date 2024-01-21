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


let db = {
  set: async function set(collection, struct, post) {
let res = await fetch("https://localhost:8080/api/v3/get/infos", {
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
  update: async function update(collection, path, struct, post) {
let res = await fetch("https://kapi.motg100.repl.co/api/v2/db", {
      headers: {
        Authorization:"KAdm " + pkay,
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       type: post? "update" : "set",
       name: collection,
       path: path,
       struct: struct,
       post: post
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
  all: async function all(post) {
let res = await fetch("https://localhost:8080/api/v3/actions", {
      headers: {
        Authorization:"KAdm " + pkay,
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       type:"all",
       post: post
     })
    }).then(x=>x.json())
  if(res.status!==200) return res.message
    return res.data
  }
} 