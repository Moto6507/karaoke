function infosIsAlready() {
  const [email, password] = document.getElementsByTagName('input');
  const isAnEmail = () => {
    return !!(email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))
  }
  console.log(isAnEmail)
  if(password.value && isAnEmail()) {
    document.getElementsByClassName('button')[0].setAttribute('onclick', 'login()');
  document.getElementsByClassName('button')[0].classList.remove('grey')
    return;
}
  document.getElementsByClassName('button')[0].removeAttribute('onclick', 'login()');
  document.getElementsByClassName('button')[0].classList.add('grey')
}

function login() {
  const [email, password] = document.getElementsByTagName('input');
  const error = document.getElementById('error').style;
  const showError = (msg) => {
  if(error.display==="none") {
    error.display = "block";
    error.innerHTML = msg
    return;
  } 
  error.display = "none";
  error.innerHTML = ""
}
  const isAVeribleEmail = (email) => {
    
  }
  if(email.value.length>1) {
    showError("Some parameters are empty")
    return;
  }
}