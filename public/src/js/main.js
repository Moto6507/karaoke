let openTab, mainSaved;

function changeTab(element, tabToChange) {
  const content = document.getElementById('content')
  const routes = [].slice.call(document.getElementsByClassName('route'));
  routes.map(x=>{
    if(x.href) return;
    if(tabToChange!=='main') x.style.opacity='0.5'
    else x.style.opacity='9'
  }) 
  element.style.opacity='9'
  openTab = tabToChange
  if(!mainSaved) mainSaved = content.innerHTML
  switch(openTab) {
    case 'main': content.innerHTML = mainSaved
    break;
    case 'search': {
    content.innerHTML = `<div class='container'><input type='text' placeholder='search' class='textbox'> <i id='search' class='icon-search'></i></div><div class='button grey'>clear history</div><div class='card'><i class='icon-search'></i>ccc<span></span></div>`
    document.addEventListener('contextmenu', (d) =>{
      if(d.target.id==='search') {
        d.preventDefault()
        overlay(`<div class='container inOverlay'><h2 class='title'>search configuration</h2>the search </div>`)
      }
    })
    }
    break;
    case 'notifications': {
      content.innerHTML = `<div class='notification'><img src='/images/anonymous.webp'> <div class='information'><h2 class='title'>new log in</h2><br>looks like who have an new login in this account</div></div><div class='notification'><img src='/images/anonymous.webp'> <div class='information'><h2 class='title'>new log in</h2><br>looks like who have an new login in this account</div></div>`
    }
    break;
    case 'library': {
      content.innerHTML = `<div class='button modern' onclick="overlay(\`<div class='container inOverlay'><h2 class='title'>new playlist</h2>enter a name of the playlist (or esc)<input type='text' class='textbox' placeholder='my songs to study'></div>\`)"><i class='icon-plus'></i> new playlist<span></span></div><h2 class='title'>no midia here</h2>looks like whe dont have anthing here....`
      
    }
    break;
  }
}

document.addEventListener("keydown", (e) => {
  if(e.key==='Escape') overlay()
})