import express from 'express';
import useragent from "express-useragent"
import { fetch, Agent } from "undici";
import { Algorithm } from '../utils/recommendationAlgorithm'
const algorithm = new Algorithm();

export const main = express.Router().get('/k', async (req: any, res: any) => {
  if(!req.session?.token) return res.redirect('/login');
  var agent = useragent.parse(req.headers['user-agent']).isMobile;
  const 
   user = await fetch("https://kapi.loca.lt/api/v3/get/infos/" + req.session?.token, {
    method: 'GET',
    dispatcher: new Agent({ connectTimeout: 30000 })
 }).then((x: any) =>x.json()).catch(x=>console.log(x)),
   all: any = await fetch("https://kapi.loca.lt/api/v3/get/infos/all", {
    method: 'GET'
  }).then(x=>x.json()),
   allPosts: any = await fetch("https://kapi.loca.lt/api/v3/get/infos/all?post=true", {
    method: 'GET'
  }).then(x=>x.json());
  if(user.status!==200) {
    req.session.token = null;
    res.redirect('/')
    return;
  }
  algorithm.register(allPosts, all, user)
  const algorithmGerated: Array<string> | any = algorithm.gerate();
  if(agent) res.render("main.html", {
    user: user.user,
    algorithm: algorithmGerated.join(' ')
  })
  else res.render("desktop/main.html", {
    user: user.user,
    algorithm: algorithmGerated.join(' ')
  })
});