import express from 'express';
import useragent from "express-useragent"

export const 
  loginPage = express.Router().get('/login', (req: any, res: any) => {
   if(req.session?.token) return res.redirect('/k')
    console.log(req.session?.token)
  res.render('login.html')
}),
  logoutRoute = express.Router().get('/logout', (req: any, res: any) => {
    if(!req.session?.token) return res.redirect('/login')
    req.session?.token = null;
    res.redirect('/')
  }),
  loginIntern = express.Router().post('/login', (req: any, res: any) => {
   if(req.session?.token) return res.redirect('/k');
   const token = (Math.random() * 900000000).toString(36).substr(0, 10) + "_" + req.body.identifier;
   req.session.token = token
   fetch("https://kapi.loca.lt/api/v3/actions", {
      headers: {
        "Content-Type":"application/json",
        'Cache-Control': 'max-age=500'
      },
     method:"POST",
     cache: "default",
     body: JSON.stringify({
       action:"database",
       type: "updateCertainObject",
       collection: req.body.email,
       path: ['accessKey', token]
     })
    }).then(x=>x.json())
   return res.json({ status: 200 })
  });