"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIntern = exports.logoutRoute = exports.loginPage = void 0;
const express_1 = __importDefault(require("express"));
exports.loginPage = express_1.default.Router().get('/login', (req, res) => {
    var _a, _b;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)
        return res.redirect('/k');
    console.log((_b = req.session) === null || _b === void 0 ? void 0 : _b.token);
    res.render('login.html');
}), exports.logoutRoute = express_1.default.Router().get('/logout', (req, res) => {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.token))
        return res.redirect('/login');
    (_b = req.session) === null || _b === void 0 ? void 0 : _b.token = null;
    res.redirect('/');
}), exports.loginIntern = express_1.default.Router().post('/login', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)
        return res.redirect('/k');
    const token = (Math.random() * 900000000).toString(36).substr(0, 10) + "_" + req.body.identifier;
    req.session.token = token;
    fetch("https://kapi.loca.lt/api/v3/actions", {
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'max-age=500'
        },
        method: "POST",
        cache: "default",
        body: JSON.stringify({
            action: "database",
            type: "updateCertainObject",
            collection: req.body.email,
            path: ['accessKey', token]
        })
    }).then(x => x.json());
    return res.json({ status: 200 });
});
