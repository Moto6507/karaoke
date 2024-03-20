window.onload=()=>{infosIsAlready()}
let identifierOfUser;
const usernameEditor = (username) => {
    if(!identifierOfUser) identifierOfUser = Number(gerateId())
    const usernameElement = document.getElementById('username')
    if(username.value.includes(' ')) username.value = username.value.replace(' ', '')
    if(usernameElement.value !== username.value) usernameElement.innerHTML = "<div style='font-size: 18px'>you are</div>" + username.value + "<br><div style='display: inline-block; margin: 0; font-size: 15px'>identified by</div>  <div style='display: inline-block; font-size: 15px; color: #425fff'>" + identifierOfUser + "</div>"
    if(!username.value) usernameElement.innerHTML = ''
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
  passwordElement.innerHTML = status
}
function infosIsAlready() {
    const [username, biography, email, password] = document.getElementsByTagName('input');
    const isAnEmail = () => {
      return !!(email.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ))
    }
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
}

async function createAccount(t) {
  const [username, biography, email, password] = document.getElementsByTagName('input');
  
  const showError = (msg) => {
    if(error.style.display==="none") {
      t.innerHTML = "sign up"
      error.style.display = "block";
      error.innerHTML = msg
      return;
    } 
    error.style.display = "none";
    error.innerHTML = ""
  }
  t.innerHTML = 'loading...'
  if(error.style.display==="block") showError();
  const userExists = await db.get(email.value);
  console.log(userExists)
  if(userExists.status) return showError(email.value + " is aready registred!")
  let res = await fetch("http://localhost:8080/api/v3/actions", {
    headers: {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*",
      'Cache-Control': 'max-age=500'
    },
   cache: "default",
   method:"POST",
   body: JSON.stringify({
    action: 'createAccount',
    username: username.value, 
    identifier: identifierOfUser, 
    password: password.value, 
    email: email.value,
    biography: biography.value
   })
  }).then(x=>x.json());
  if(res.status!==200) return showError('unable to create account')
  else setTimeout(()=>window.location.href='/login',1000)
}