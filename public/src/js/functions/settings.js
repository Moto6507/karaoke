let 
  cancelAvatarSrc = () => document.getElementsByClassName('img')[0].style.opacity = 0.5,
  srcAvatar = (e) => {
        if(!e.files[0]) return;
         const reader = new FileReader();
        reader.onload=()=> {
       document.getElementById('userAvatar').src = reader.result;
       imageSelected = reader.result
       document.getElementsByClassName('img')[0].style.opacity = 9
     }
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
        x.style.fontSize = value + 'px'
      })
    }
   document.body.style.fontSize = value + 'px'
  },
  imageSelected;
function showSettings() {
  document.getElementById('overlay').style.overflow='hidden'
  overlay(`<div class='configurationBox'>
       <div class='scrollArea'>
       <h3 class='title separate'>User</h3>
         <div class='option selected' onclick="changeSettingsTab(0, this)"><span>Profile</span></div>
         <div class='option' onclick="changeSettingsTab(1, this)"><span>Blocked users</span></div>
         <div class='option' onclick="changeSettingsTab(2, this)"><span>Security</span></div>
         <br>
         <br>
         <h3 class='title separate'>Site preferences</h4>
         <div class='option' onclick="changeSettingsTab(3, this)"><span>Accessibility</span></div>
         <div class='option' onclick="changeSettingsTab(4, this)"><span>Language</span></div>
         <div class='option' onclick="changeSettingsTab(5, this)"><span>Compatibilities</span></div>
         <br>
         <br>
         <h3 class='title separate'>Audio settings</h3>
         <div class='option' onclick="changeSettingsTab(7, this)"><span>Audio</span></div>
         <div class='option' onclick="changeSettingsTab(8, this)"><span>Audio equalizer</span></div>
         <br>
         <br>
         <br>
         <h3 class='title separate'>About</h3>
         <div class='option'>About us</div>
         <div class='option'>Privacy</div>
         <div class='option' style='border: none; margin-bottom: 5px'>Community</div><br>
       </div>
       <div class='scrollArea'></div>
        <input type='file' id='avatar' accept='image/png' onclick="cancelAvatarSrc()" onchange="srcAvatar(this)">
      </div>`)
      changeSettingsTab(0,document.getElementsByClassName('option')[0])
}

function cardChangeSelect(element) {
  const elements = [].slice.call(document.getElementsByClassName('select'))
  elements.map(x=>{
    x.classList.remove('selected')
  })
  element.classList.add('selected')
}

function changeSettingsTab(tab, element) {
  const optionsElements = [].slice.call(document.getElementsByClassName('option'));
  const area = document.getElementsByClassName('scrollArea')[1]
  optionsElements.map(x=>x.classList.remove('selected'));
  element.classList.add('selected')
  area.innerHTML = getTab(tab)
}