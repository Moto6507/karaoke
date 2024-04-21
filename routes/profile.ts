import express from 'express'
import useragent from "express-useragent"
import path from 'path';
export const profile = express.Router().get('/k/profile/:user',async (req: any, res: any) => {
  if(!req.session?.token) return res.redirect('/k');
  const userName = req.params.user;
  const accessUser = await fetch("http://localhost:8080/api/v3/get/infos/" + req.session?.token, {
    method: 'GET'
}).then(x=>x.json())
  const user = await fetch("http://localhost:8080/api/v3/get/infos/" + userName, {
    headers: {
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*",
      'Cache-Control': 'max-age=500'
    },
   cache: "default",
   method:"GET"
  }).then(x=>x.json())
  if(!user.user) return res.sendFile(path.resolve() + '/views/desktop/noFound.html')
  const posts = await fetch("http://localhost:8080/api/v3/actions", {
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
  userPosts: Array<any> = [];
    posts.data.map((x: any)=>{
       if(x.by===user.user.identifier) userPosts.push(x)
    })
  const iFollow = accessUser.follow?.find((x: any)=>x===user.identifier)? true : false
  var agent = useragent.parse(req.headers['user-agent']).isMobile;
  if(agent) res.render('profile.html', {
    user: user.user,
    accessUser: accessUser.user,
    iFollow,
    posts: userPosts,
    statics: `<div class='statics'><strong>${posts.data.length}</strong> posts</div><div class='statics noBorder'><strong>${user.user.followers.length}</strong> Followers</div>`
  })
    else res.render('desktop/profile.html', {
    user: user.user,
    accessUser: accessUser.user,
    iFollow,
    posts: userPosts,
    statics: `<div class='statics'><strong>${posts.data.length}</strong> posts</div><div class='statics noBorder'><strong>${user.user.followers.length}</strong> Followers</div>`
  });
})