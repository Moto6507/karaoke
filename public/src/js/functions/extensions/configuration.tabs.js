function getTab(page) {
const pages = [
    `<br><br><img id='userAvatar' src='http://localhost:8080/api/v3/get/media/avatars/${user.avatar}' crossorigin='anonymous'> 
    <label for='avatar'>
    <div class='img'><i class='icon-plus'></i><br></div>
    </label>
    <h2 class='title'>username</h2>
    <input type='text' placeholder='username...' value='${user.username}' class='textbox'>
    <br>
    <h2 class='title'>biography</h2>
    <input type='text' placeholder='biography...' value='${user.biography}' class='textbox'>
    <br>
    <h2 class='title'>teams</h2>
    you no have affliliates
    <br><br><br>
    <hr>
    <h2 class='title'>profissional or public</h2>
    <div class='card'>profissional account<span></span></div>
    This makes your profile completely professional, access will be restricted to only the /creator route
    <div class='card'>verification<span></span></div>
    your profile can't be verified, verify <a href='a' class='link'>Community Terms</a>.
    `,
    `${user.blockedUsers.length<1? "<img src='/images/demon.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>you no has blocked users</h2>it look's like you no have inimmies..." : ""}`,
    `<img src='/images/security.webp' class='bodyImg' style='border-radius: 0'>
    <h2 class='title'>security</h2>
    your account has ways to make your account more security.
    <hr>
    <h2 class='title separate'>privacy</h2>
    <div class='card simple' style='opacity: 0.5'>login key <i class='icon-right'></i></div>
    <div class='card simple' style='opacity: 0.5'>private account <i class='icon-right'></i></div>
    <div class='card simple' style='opacity: 0.5'>get my infos <i class='icon-right'></i></div>
    yours infos will be analysed and autorized to give.`,
    `<img src='/images/confuse.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>accessibility</h2>
    transform your experience on karaoke more better.
    <hr>
    ${settings.get('accessibility').fontSize || settings.get('accessibility').iconSize? `<div class='button grey' onclick="if(!${settings.get('accessibility').fontSize}) return; \n settings.set('accessibility', { fontSize: null, iconSize: null }) \n srcFont('initial',true) \n srcFont('initial')">reset to default</div>
    reset all changes to default configuration.
    <hr>` : ''}
    <h4 class='title'>font size</h4>
    <input oninput='srcFontSize(this.value)' min='10' max='29' value='${settings.get('accessibility').fontSize || 10}' step='0.5' type='range'>
    <br>
    <h4 class='title'>icon size</h4>
    <input oninput='srcFontSize(this.value, true)' min='10' max='40' value='${settings.get('accessibility').iconSize || 10}' step='0.5' type='range'>
    <div class='card'><i class='icon-music' style='font-size: ${settings.get('accessibility').iconSize}px'></i> demonstrative font size<span></span></div>
    <br><br><hr>
    <div class='card simple'>partners animation<span></span></div>
    will be disable/enable partners animations`,
    `ccc`,
    `ddd`,
    `ggg`,
    `<img src='/images/sound.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>Audio Preferences</h2>the karaoke offers preferences
    of the audio <strong>(karaoke not have access the hardware of your device, will be modify browser)</strong>
    <hr>
    <h2 class='title separate'>filter</h3>
    <div class='card select' onclick="changeFilter(null,this)" id='no'><i class='icon-volume-high'></i> no filter<span></span></div>
    <div class='card select' onclick="changeFilter('peaking',this)" id='peaking'><i class='icon-volume-high'></i> peaking<span></span></div>
    <div class='card select' onclick="changeFilter('lowbass',this)" id='lowbass'><i class='icon-volume-high'></i> lowbass<span></span></div>
    <div class='card select' onclick="changeFilter('notch',this)" id='notch'><i class='icon-volume-high'></i> notch<span></span></div>
    <div class='card select'><i class='icon-volume-high'></i> no filter<span></span></div>
    <div class='card select'><i class='icon-volume-high'></i> no filter<span></span></div>
    <br><hr>
    <h2 class='title separate'>preferences</h3>
    <h4 class='title'>volume</h4>
    <input type='range' max='1' step='0.5' min='0' oninput="settings.set('audio', { volume: this.value })" value='${settings.get('audio').volume || 0}'>
    <br>
    <h4 class='title'>audio quality</h4>
    <select onchange="settings.set('audio', { quality: this.value })" class='selectBox'>
    <option value='high'>High</option>
    <option value='medium'>Medium</option>
    <option value='low'>Low</option>
    </select><br>
    the audio quality will affect the velocity of buffering of audio.<br><br>
    `,
    ``
]
if(page===7) setTimeout(()=>cardChangeSelect(document.getElementById(settings.get('audio').filter || "no")),30)
return pages[page]
}