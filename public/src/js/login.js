window.onload=()=>{infosIsAlready()}
function infosIsAlready() {
  const [email, password] = document.getElementsByTagName('input');
  const isAnEmail = () => {
    return !!(email.value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
  }
  if(password.value && isAnEmail()) {
    document.getElementsByClassName('button')[0].setAttribute('onclick', 'login(this)');
  document.getElementsByClassName('button')[0].classList.remove('grey')
    return;
}
  document.getElementsByClassName('button')[0].removeAttribute('onclick', 'login()');
  document.getElementsByClassName('button')[0].classList.add('grey')
}
async function login(t) {
  const [email, password] = document.getElementsByTagName('input');
  const error = document.getElementById('error');
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
  t.innerHTML = "loading..."
  const user = await db.get(email.value);
  if(!user.status) {
    showError("Email is wrong or user doens't exists")
    return;
  }
  if(user.user.password!==password.value) {
    showError("Password is wrong")
    return;
  }
  if(error.style.display==="block") showError()
  t.removeAttribute("onclick");
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      identifier: user.user.identifier,
      email: email.value
    })
  });
  if(res.status===200) {
    t.innerHTML = "sign up"
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
}