/*window.onload=()=>{infosIsAlready()}*/
let identifierOfUser, currentSection = 0, userCredentials = {
  username: "",
  id: "",
  biography: "",
  password: "",
  genrersWhoLike: [],
  email: "",
  action: "createAccount"
}, passwordIsCorrect = false;/*
const usernameEditor = (username) => {
    if(!identifierOfUser) identifierOfUser = Number(gerateId())
    const usernameElement = document.getElementById('username')
    if(username.value.includes(' ')) username.value = username.value.replace(' ', '')
    if(usernameElement.value !== username.value) usernameElement.innerHTML = "<div style='font-size: 18px'>you are</div>" + username.value + "<br><div style='display: inline-block; margin: 0; font-size: 15px'>identified by</div>  <div style='display: inline-block; font-size: 15px; color: #425fff'>" + identifierOfUser + "</div>"
    if(!username.value) usernameElement.innerHTML = ''
}*/
const hableNext =() => {
  const button = document.getElementsByClassName('button')[0]
  button.classList.remove('grey')
  button.setAttribute('onclick','next()')
}
const disableNext =() => {
  const button = document.getElementsByClassName('button')[0]
  button.classList.add('grey')
  button.setAttribute('onclick','')
}
const checkPasswordVeracity = (password) => {
  const passwordElement = document.getElementById('passwordChecker')
  let status = ""
  if(password.length < 8) { 
   status = "Password must be at least 8 characters"
   passwordElement.style.color = "rgb(255,181,96)"
  }
  if(password.search(/[a-z]/) < 0) {
    status = "Password must contain at least one lowercase letter"
    passwordElement.style.color = "rgb(255,245,96)"
  }
  if(password.search(/[A-Z]/) < 0) {
   status = "Password must contain at least one uppercase letter"
   passwordElement.style.color = "rgb(255,196,96)"
  }
  if(password.search(/[0-9]/) < 0) {
   status = "Password must contain at least one number"
   passwordElement.style.color = "rgb(154,255,107)"
}
  if(!status) passwordIsCorrect = true
  passwordElement.innerHTML = status
}
const startCreatingAccount = () =>{
  const content = document.getElementById('container')
  const spotSellected = document.getElementsByClassName('spot')[4]
  spotSellected.classList.remove('current')
  spotSellected.classList.add('passed')
  content.style.textAlign = 'center'
  content.innerHTML = `${loader}<h2 class='title'>preparing data...</h2>
  this fell thake a while of minutes`
  createAccount()
  
}
const isAnEmail = (email = String(email)) => {
  return !!(email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ))
}/*
function infosIsAlready() {
    const [username, biography, email, password] = document.getElementsByTagName('input');
    usernameEditor(username)
    checkPasswordVeracity(password.value)
    if(username.value && biography.value && password.value && isAnEmail()) {
      document.getElementsByClassName('button')[0].setAttribute('onclick', 'createAccount(this)');
      document.getElementsByClassName('button')[0].classList.remove('grey') 
      return;
    }
      document.getElementsByClassName('button')[0].removeAttribute('onclick');
      document.getElementsByClassName('button')[0].classList.add('grey')
      return;
}*/

async function createAccount() {
  const userExists = await db.get(userCredentials.email);
  const content = document.getElementById('container')
  if(userExists.status) return alert(userCredentials.email + " is aready registred!")
  if(!identifierOfUser) identifierOfUser = Number(gerateId())
  content.innerHTML = `<div class='progressBox'><span id='progress'></span></div><h2 class='title'>sending...</h2>wait a seconds...`
  let res = await axios.request("https://kapi.loca.lt/api/v3/actions", {
    headers: {
      "Content-Type":"application/json"
    },
   cache: "default",
   method:"POST",
   data: JSON.stringify(userCredentials),
    onUploadProgress: (p) => document.getElementById('progress').style.width = p.loaded / p.total * 100 + '%'
  })
  content.innerHTML = `
  <h1 class="title"><i class="icon-karaoke"></i></h1>
<h1 class='title'>welcome ${userCredentials.username}!</h1>it's sooooooooo see you on this experiences!`
  setTimeout(()=>window.location.href='/login',1000)
}