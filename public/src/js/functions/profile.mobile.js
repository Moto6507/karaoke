
function changeSection(element, section) {
  try {
  const content = document.getElementById('content')
  const routes = [].slice.call(document.getElementsByClassName('section'));
  routes.map(x=>x.classList.remove('selected')) 
  //element.classList.add('selected')
} catch(e) {
    alert(e)
}
}