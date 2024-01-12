import express from 'express';
import session from 'express-session'
import hbs from 'hbs';
import {
  main
} from './routes/main'
import {
  createAccount
} from './routes/create'
import {
  loginPage,
  loginIntern
} from './routes/login'
const app = express();

app.set('trust proxy', 1);
app.set('view engine', 'html');
app.use(express.static('public'))
app.engine('html', hbs.__express);
app.set('views', './views')
app.use(session({
  secret: 'GcYCYGTvY786fTC8tt6',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.get('/', (req, res)=>res.redirect('/k'));
app.get('/k', main)
app.get('/login', loginPage)
app.post('/login', loginIntern)
app.get('/create', createAccount)
app.listen(3000, ()=>console.log('sever running'))