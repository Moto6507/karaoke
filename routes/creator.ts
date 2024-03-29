import express from 'express'

export const creator = express.Router().get('/k/creator', async(req: any, res: any) => {
    if(!req.session?.token) return res.redirect('/k')
   let 
    user = await fetch("http://localhost:8080/api/v3/get/infos/" + req.session?.token, {
    method: 'GET'
 }).then((x: any) =>x.json()).catch(x=>console.log(x)),
    postsMapped = await fetch("http://localhost:8080/api/v3/actions", {
   headers: {
     "Content-Type":"application/json",
     "Access-Control-Allow-Origin": "*"
   },
  method:"POST",
  cache: "default",
  body: JSON.stringify({
   action:"database",
   type: "all",
   isPost: true
  })
 }).then(x=>x.json()),
 posts: Array<any> = [];
   postsMapped.data.map((x: any)=>{
      if(x.by===user.user.identifier) posts.push(x)
   })
   res.render('desktop/creatorPortal.html', {
    user: user.user,
    postsName: posts.length >= 1? posts.map((x:any)=>x.title) : null,
    postsLenght: posts.length,
    yourPosts: posts.length >= 1? posts.map((x: any,i=0)=>`<div class='containerDevelop'><h3 class='title titleWhite'>${x.title}</h3> song #${i++}
    <br>
    <h5 class='title'>Some statics</h5>
    <div class='staticBox'>
      listeners: ${x.listeners}
    </div>
    </div>`).join('') : null
   })
})