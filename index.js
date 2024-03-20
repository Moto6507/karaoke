"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const hbs_1 = __importDefault(require("hbs"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const main_1 = require("./routes/main");
const create_1 = require("./routes/create");
const creator_1 = require("./routes/creator");
const login_1 = require("./routes/login");
const profile_1 = require("./routes/profile");
const app = (0, express_1.default)();
hbs_1.default.registerHelper('json', function (context) {
    return JSON.parse(JSON.stringify(context));
});
hbs_1.default.registerHelper('string', function (context) {
    return JSON.stringify(context);
});
hbs_1.default.registerHelper('equal', function (a, b) {
    return a === b;
});
hbs_1.default.registerHelper('diference', function (a, b) {
    return a !== b;
});
app.set('trust proxy', 1);
app.set('view engine', 'html');
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.engine('html', hbs_1.default.__express);
app.set('views', './views');
app.use((0, express_session_1.default)({
    secret: 'GcYCYGTvY786fTC8tt6',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.get('/', (req, res) => res.redirect('/k'));
app.get('/k', main_1.main);
app.get('/k/creator', creator_1.creator);
app.get('/k/profile/:user', profile_1.profile);
app.get('/login', login_1.loginPage);
app.get('/logout', login_1.logoutRoute);
app.post('/login', login_1.loginIntern);
app.get('/create', create_1.createAccount);
app.use((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).sendFile(path_1.default.resolve() + '/views/desktop/noFound.html');
}));
app.listen(3000, () => console.log('sever running 3000'));
