let 
  cancelAvatarSrc = () => document.getElementsByClassName('img')[0].style.opacity = 0.5,
  cancelBackgroundSrc = () => document.getElementsByClassName('img2')[0].style.opacity = 0.5,
  srcAvatar = (e) => {
        if(!e.files[0]) return;
         const reader = new FileReader();
        reader.onload=()=> {
       document.getElementById('userAvatar').src = reader.result;
       imageSelected = reader.result
       document.getElementsByClassName('img')[0].style.opacity = 9
     }
       unlockSave()
       if(e.files[0]) reader.readAsDataURL(e.files[0])
    },
  srcBackground = (e) => {
      if(!e.files[0]) return;
       const reader = new FileReader();
      reader.onload=()=> {
     document.getElementById('userBackground').src = reader.result;
     imageSelected = reader.result
     document.getElementsByClassName('img2')[0].style.opacity = 9
   }
     unlockSave()
     if(e.files[0]) reader.readAsDataURL(e.files[0])
  },
  waitingResolveChanges, 
  returnToSettings = () => {
    overlay()
    setTimeout(()=>overlay(waitingResolveChanges),200)
  },
  changeFilter = (filterName, el) => {
   settings.set('audio', { filter: filterName })
   cardChangeSelect(el)
  },
  srcFontSize = (value,isIconFont) => {
    if(isIconFont) {
      const icons = [].slice.call(document.body.getElementsByTagName('i'))
      settings.set('accessibility', { iconSize: value })
      return icons.map(x=>{
        x.style.fontSize = value + 'px'
      })
    }
   document.body.style.fontSize = value + 'px'
   settings.set('accessibility', { fontSize: value })
  },
  srcFont = (value,isIconFont) => {
    if(isIconFont) {
      const icons = [].slice.call(document.body.getElementsByTagName('i'))
      return icons.map(x=>{
        x.style.fontSize = typeof value == Number? value + 'px' : value
      })
    }
   document.body.style.fontSize = typeof value == Number? value + 'px' : value
  },
  passwordStep = () => {
   const area = document.getElementsByClassName('scrollArea')[1]
   area.innerHTML = `<h2 class='title'>password</h2>
   your password is`
  },
  unlockSave = () => {
   const saveOptions = document.getElementById('saveChanges');
   saveOptions.style.display='block'
  },
  lockSave = () => {
   const saveOptions = document.getElementById('saveChanges');
   saveOptions.style.display='none'
  },
  actualTab,
  imageSelected,
  resetAccessibility = () => {
    settings.set('accessibility', { fontSize: null }) 
    srcFont('initial',true) 
    srcFont('initial'); 
    [].slice.call(document.getElementsByClassName('rangeConfigs')).map(x=>x.value=0)
    changeSettingsTab(3, document.getElementsByClassName('option')[0])
  }
function showSettings() {
  document.getElementById('overlay').style.overflow='hidden'
  overlay(`<div class='configurationBox'>
       <div class='scrollArea'>
       <div id='saveChanges' style='display: none'>
       <div class='button' onclick='saveChanges()'>save changes</div>
       <div class='button grey' onclick='discardChanges()'>discard changes</div>
       <hr>
       </div>
       <h3 class='title separate'>User</h3>
         <div class='option selected' onclick="changeSettingsTab(0, this)"><span>Profile</span></div>
         <div class='option' onclick="changeSettingsTab(1, this)"><span>Account</span></div>
         <div class='option' onclick="changeSettingsTab(2, this)"><span>Security</span></div>
         <div class='option' onclick="changeSettingsTab(2, this)"><span>Devices</span></div>
         <br>
         <br>
         <h3 class='title separate'>Site preferences</h4>
         <div class='option' onclick="changeSettingsTab(3, this)"><span>Accessibility</span></div>
         <div class='option' onclick="changeSettingsTab(4, this)"><span>Language</span></div>
         <br>
         <br>
         <h3 class='title separate'>Audio settings</h3>
         <div class='option' onclick="changeSettingsTab(5, this)"><span>Audio</span></div>
         <div class='option' onclick="changeSettingsTab(6, this)"><span>Audio equalizer</span></div>
         <br>
         <br>
         <br>
         <h3 class='title separate'>About</h3>
         <div class='option'>About us</div>
         <div class='option'>Privacy</div>
         <div class='option' style='border: none; margin-bottom: 5px'>Community</div><br>
       </div>
       <div class='scrollArea'></div>
        <input type='file' id='background' accept='image/png' onclick="cancelBackgroundSrc()" onchange="srcBackground(this)">
        <input type='file' id='avatar' accept='image/png' onclick="cancelAvatarSrc()" onchange="srcAvatar(this)">
      </div>`)
      changeSettingsTab(0,document.getElementsByClassName('option')[0])
}
async function setImage(type) {
  const avatarId =  generateToken(18);
  await fetch("https://kapi.loca.lt/api/v3/upload", {
      headers: {
        "Content-Type":"application/json"
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
      avatar: {
        id: avatarId,
        last: user.avatar,
        file: imageSelected
      }
     })
    }).then(x=>x.json())
    document.getElementsByClassName('img')[0].style.opacity = 9
    db.update(user.email, "avatar", avatarId)
    document.getElementsByClassName('userAvatar')[0].src = 'http://localhost:8080/api/v3/get/media/avatars/' + avatarId
    user.avatar = avatarId
    imageSelected = ''
}
async function changePassword(){

}
function changeSettingsTab(tab, element) {
  const optionsElements = [].slice.call(document.getElementsByClassName('option'));
  const area = document.getElementsByClassName('scrollArea')[1]
  optionsElements.map(x=>x.classList.remove('selected'));
  element.classList.add('selected')
  actualTab = tab
  area.innerHTML = getTab(tab)
}

function saveChanges() {
  const saveOptions = document.getElementById('saveChanges');
  const username = document.getElementById('usernameInput')
  const biography = document.getElementById('biographyInput')
  if(username.value) {
    db.update(user.email, "username", username.value);
  }
  if(biography.value) {
    db.update(user.email, "biography", biography.value);
  }
  if(imageSelected) setImage()
  saveOptions.style.display='none'
}
function discardChanges() { 
  const saveOptions = document.getElementById('saveChanges');
  saveOptions.style.display='none'
  imageSelected = null
  changeSettingsTab(actualTab, document.getElementsByClassName('option')[actualTab])
}
