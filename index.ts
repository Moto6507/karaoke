import express from 'express';
import session from 'express-session'
import hbs from 'hbs';
import cors from "cors"
import localtunnel from 'localtunnel'
import bodyParser from 'body-parser';
import path from 'path'
import {
  main
} from './routes/main' 
import {
  createAccount
} from './routes/create' 
import {
  creator
} from './routes/creator' 
import {
  loginPage,
  logoutRoute,
  loginIntern
} from './routes/login'
import {
  profile
} from './routes/profile'
const app = express();
hbs.registerHelper('json', function(context: JSON) {
  return JSON.parse(JSON.stringify(context))
})
hbs.registerHelper('string', function(context: JSON) {
  return JSON.stringify(context)
})
hbs.registerHelper('equal', function(a: any, b: any) {
  return a === b
})
hbs.registerHelper('diference', function(a: any, b: any) {
  return a !== b
})
app.set('trust proxy', 1);
app.set('view engine', 'html');
app.use(express.static('public'))
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.engine('html', hbs.__express);
app.set('views', './views')
app.use(session({
  secret: 'GcYCYGTvY786fTC8tt6',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/',
    secure: false, 
    maxAge: 60000 * 60 * 24
  }
}))
app.get('/', (req, res)=>res.redirect('/k'));
app.get('/k', main)
app.get('/k/creator', creator)
app.get('/k/profile/:user', profile)
app.get('/login', loginPage)
app.get('/logout', logoutRoute)
app.post('/login', loginIntern)
app.get('/create', createAccount)
app.use(async(req: any, res: any)=>{
  res.status(404).sendFile(path.resolve() + '/views/desktop/noFound.html')
});
app.listen(3000, () => console.log('sever running 3000'));
(async()=>{
  const tunnel = await localtunnel({ port: 3000, subdomain: 'karaoke' })
console.log(tunnel.url)
})()