import express from 'express';
import session from 'express-session'
import hbs from 'hbs';
import cors from "cors"
import bodyParser from 'body-parser';
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
hbs.registerHelper('json', function(context: JSON) {
  return JSON.parse(JSON.stringify(context))
})
hbs.registerHelper('string', function(context: JSON) {
  return JSON.stringify(context)
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
  cookie: { secure: false }
}))
app.get('/', (req, res)=>res.redirect('/k'));
app.get('/k', main)
app.get('/login', loginPage)
app.post('/login', loginIntern)
app.get('/create', createAccount)
app.listen(3000, () => console.log('sever running 3000'));