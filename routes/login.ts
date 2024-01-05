import express from 'express';

export const 
  loginPage = express.Router().get('/login', (req, res) => {
  res.render('login.html')
}),
  loginIntern = express.Router().post('/login', (req, res) => {
   if(req.session) return;
    //req.session.token = (Math.random() * 900000000).toString(36).substr(0, 10);
  });