import express from 'express';
import useragent from "express-useragent"

export const createAccount = express.Router().get('/create', (req: any, res: any) => {
  var agent = useragent.parse(req.headers['user-agent']).isMobile
  if(req.session?.token) return res.redirect('/k');
  res.render('createAccount.html', {
    screen: agent? '' : `style='margin: 100px; margin-top: 0'`
  })
});