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
  imageSelected;
function showSettings() {
  overlay(`<div class='configurationBox'>
       <div class='scrollArea'>
       <h3 class='title separate'>User</h3>
         <div class='option'>Profile</div>
         <div class='option'>My device</div>
         <div class='option'>Blocked users</div>
         <div class='option'>Profile</div>
         <br>
         <br>
         <h3 class='title separate'>Site preferences</h4>
         <div class='option'>Accessibility</div>
         <div class='option'>Language</div>
         <div class='option'>Keys</div>
         <div class='option'>Compatibilities</div>
         <div class='option'>Audio</div>
         <br>
         <br>
         <h3 class='title separate'>Audio settings</h3>
         <div class='option'>Audio equalizer</div>
         <div class='option'>Lyrics</div>
         <br>
         <br>
         <br>
         <h3 class='title separate'>About</h3>
         <div class='option'>About us</div>
         <div class='option'>Privacy</div>
         <div class='option' style='border: none; margin-bottom: 5px'>Community</div>
       </div>
       <div class='scrollArea'><br><br><br>
        <img id='userAvatar' src='http://localhost:8080/api/v3/get/media/avatars/${user.avatar}' crossorigin='anonymous'> 
        <label for='avatar'>
        <div class='img'><i class='icon-plus'></i><br></div>
        </label>
        <h2 class='title'>username</h2>
        <input type='text' value='${user.username}' class='textbox'>
        <br>
        <h2 class='title'>biography</h2>
        <input type='text' value='${user.biography}' class='textbox'>
        <br>
        <h2 class='title'>teams</h2>
        You haven't affiliated with anyone yet
        <br><br><br>
        <hr>
        <h2 class='title'>profissional or public</h2>
        <div class='card'>profissional account<span></span></div>
        This makes your profile completely professional, access will be restricted to only the /creator route
        <div class='card'>verification<span></span></div>
        your profile can't be verified, verify <a href='a' class='link'>Community Terms</a>.
        </div>
        <input type='file' id='avatar' accept='image/png' onclick="cancelAvatarSrc()" onchange="srcAvatar(this)">
      </div>`)
}