import express from 'express';

export const createAccount = express.Router().get('/create', (req: any, res: any) => {
  if(req.session?.token) return res.redirect('/k');
  res.render('createAccount.html')
});