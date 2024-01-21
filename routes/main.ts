import express from 'express';
import useragent from "express-useragent"
import { fetch, Agent } from "undici";

export const main = express.Router().get('/k', async (req: any, res: any) => {
  if(!req.session?.token) return res.redirect('/login');
  var agent = useragent.parse(req.headers['user-agent']).isMobile;
  const user = await fetch("http://localhost:8080/api/v3/get/infos/" + req.session?.token, {
    method: 'GET',
    dispatcher: new Agent({ connectTimeout: 30000 })
}).then((x: any) =>x.json()).catch(x=>console.log(x))
  if(user.status!==200) return res.send("aaaa")
  if(agent) res.render("main.html", {
    user: user.user
  })
  else res.render("desktop/main.html", {
    user: user.user
  })
});