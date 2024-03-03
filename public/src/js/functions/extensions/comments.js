let commentContent;

function collectComments(t,event) {
  const sendButton = document.getElementById('sendBtn')
  if(t.value) sendButton.style.opacity=9
  else sendButton.style.opacity=0.5
  if(t.value?.toLowerCase().includes('k#')) {
    const commentOption = document.getElementById('commentOption');
    commentOption.style.height = "60px"
    commentOption.innerHTML = 'jhgchgdc'
  }
  commentContent = t;
  if(event.keyCode===13) comment()
}
async function comment() {
  if(!commentContent?.value) return;
  
}