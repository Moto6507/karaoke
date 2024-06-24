function getTab(page) {
const pages = [
    `<img id='userBackground' src='/images/defaultBackground.webp' class='background'><img id='userAvatar' src='${imageSelected || 'https://kapi.loca.lt/api/v3/get/media/avatars/' + user.avatar}' crossorigin='anonymous'> 
    <label for='avatar'>
    <div class='img'><i class='icon-plus'></i><br></div>
    </label><br><br><br>
    <h2 class='title'>username</h2>
    <input type='text' id='usernameInput' placeholder='username...' value='${user.username}' class='textbox'class='textbox' oninput="lockSave(); \n if(this.value.length>5) return unlockSave()">
    <br>
    <h2 class='title'>biography</h2>
    <input type='text' id='biographyInput' placeholder='biography...' value='${user.biography}' class='textbox' oninput="lockSave(); \n if(this.value.length>7) return unlockSave()">
    <br>
    <h2 class='title'>teams</h2>
    you no have affliliates
    <br><br><br>
    <hr>
    <h2 class='title'>Singer</h2>
    <div class='card simple'>profissional account <i class='icon-right'></i></div>
    Make you profile has profissional.<br>
    <div class='card simple'>Invite user to team <i class='icon-right'></i></div>
    <div class='card simple'>User public <i class='icon-right'></i></div>
     define when you profile is showed to users
    `,
    `<img src='/images/user.webp' class='bodyImg' style='border-radius: 0'>
    <h2 class='title'>account settings</h2>
    manage your account on karaoke.
    <hr>
    well, it's be like your email is not verified, if you add the telephone number, your account it's confirmed.
    <div class='button'>verify my email</div><hr>
    <div class='card simple' onclick='passwordStep()'><i class='icon-user'></i> password<i class='icon-right'></i></div>
    <div class='card simple'><i class='icon-user'></i> telephone number<span></span></div>
    <div class='card simple'><i class='icon-user'></i> FACT20<i class='icon-right'></i></div>
    <div class='card simple'><i class='icon-user'></i> get my status<span></span></div>
    `,
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
    ${settings.get('accessibility').fontSize || settings.get('accessibility').iconSize? `<div class='button grey' onclick="resetAccessibility()">reset to default</div>
    reset all changes to default configuration.
    <hr>` : ''}
    <h4 class='title'>font size</h4>
    <input class='rangeConfigs' oninput='srcFontSize(this.value)' min='10' max='29' value='${settings.get('accessibility').fontSize || 10}' step='0.5' type='range'>
    <br>
    <h4 class='title'>icon size</h4>
    <input class='rangeConfigs' oninput='srcFontSize(this.value, true)' min='10' max='40' value='${settings.get('accessibility').iconSize || 10}' step='0.5' type='range'>
    <div class='card'><i class='icon-music' style='font-size: ${settings.get('accessibility').iconSize}px'></i> demonstrative font size<span></span></div>
    <br><br>
    `,
   `<img src='/images/language.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>language</h2>
    translate karaoke to your language.
    <div class='card select selected'><i class='icon-global'></i> en-US<span></span></div>
    <div class='card select'><i class='icon-global'></i> pt-BR<span></span></div>
    <div class='card select'><i class='icon-global'></i> es<span></span></div>
    <h1 class='title'>demonstration of language, breed, apple, pen, brazilian</h1>
    the translates who translated by Google Translate, slangs may or may not translated correctly, making the texts a liitle incoherent or incorrects.`,
    `<img src='/images/sound.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>Audio Preferences</h2>the karaoke offers preferences
    of the audio <strong>(karaoke not have access the hardware of your device, will be modify browser)</strong>
    <hr>
    <h2 class='title separate'>filter</h3>
    <div class='card select' onclick="changeFilter(null,this)" id='no'><i class='icon-volume-high'></i> no filter<span></span></div>
    <div class='card select' onclick="changeFilter('lowpass',this)" id='lowpass'><i class='icon-volume-high'></i> lowpass<span></span></div>
    <div class='card select' onclick="changeFilter('highpass',this)" id='highpass'><i class='icon-volume-high'></i> highpass<span></span></div>
    <div class='card select' onclick="changeFilter('bandpass',this)" id='bandpass'><i class='icon-volume-high'></i> bandpass<span></span></div>
    <div class='card select' onclick="changeFilter('lowshelf',this)" id='lowshelf'><i class='icon-volume-high'></i> lowshelf<span></span></div>
    <div class='card select' onclick="changeFilter('highshelf',this)" id='highshelf'><i class='icon-volume-high'></i> highshelf<span></span></div>
    <div class='card select' onclick="changeFilter('peaking',this)" id='peaking'><i class='icon-volume-high'></i> peaking<span></span></div>
    <div class='card select' onclick="changeFilter('notch',this)" id='notch'><i class='icon-volume-high'></i> notch<span></span></div>
    <br><hr>
    <h2 class='title separate'>preferences</h3>
    <h4 class='title'>volume</h4>
    <input type='range' max='1' step='0.1' min='0' oninput="settings.set('audio', { volume: this.value })" value='${settings.get('audio').volume || 0}'>
    <br>
    <h4 class='title'>audio quality</h4>
    <select onchange="settings.set('audio', { quality: this.value })" class='selectBox'>
    <option value='high'>High</option>
    <option value='medium'>Medium</option>
    <option value='low'>Low</option>
    </select><br>
    the audio quality will affect the velocity of buffering of audio.<br><br>
    `,
    `<img src='/images/sound.webp' class='bodyImg' style='border-radius: 0'><h2 class='title'>Audio equalizer</h2>
    user can manipulate the audio equalizing they.
    <hr>
    ${settings.get("audio")? `<div class='container' style='border: 1px solid #6a6a6a; border-radius: 5px; color: #fff '>
    <input type='range' max='' min='0' value='0' style='width: 90%; display: inline-block'> 32
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 64
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 125
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 250
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 500
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 1k
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 2k
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 4k
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 8k
    <input type='range' max='100' min='0' value='0' style='width: 90%; display: inline-block'> 16k
    </div><br>
    <div class='container' style='border: 1px solid #6a6a6a; border-radius: 5px; color: #fff'>
    <input type='range' max='12' min='0' value='0' oninput='kamper.filter.gain.value=this.value' style='width: 90%; display: inline-block'> +12db
    </div>
    <h2 class='title'>mono</h2>
    <h2 class='title'>snap</h2>` : `<h1 class='title'>first, start on audio settings.</h1>`}

    `
]
if(page===5) setTimeout(()=>cardChangeSelect(document.getElementById(settings.get('audio').filter || "no")),30)
return pages[page]
}