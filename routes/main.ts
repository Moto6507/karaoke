import express from 'express';

export const main = express.Router().get('/k', (req, res) => {
  return res.render("main.html")
});