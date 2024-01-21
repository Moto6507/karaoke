"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIntern = exports.loginPage = void 0;
const express_1 = __importDefault(require("express"));
exports.loginPage = express_1.default.Router().get('/login', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)
        return res.redirect('/k');
    res.render('login.html');
}), exports.loginIntern = express_1.default.Router().post('/login', (req, res) => {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)
        return res.redirect('/k');
    const token = (Math.random() * 900000000).toString(36).substr(0, 10) + "_" + req.body.identifier;
    req.session.token = token;
    fetch("http://localhost:8080/api/v3/actions", {
        headers: {
            "Content-Type": "application/json",
            'Cache-Control': 'max-age=500'
        },
        method: "POST",
        cache: "default",
        body: JSON.stringify({
            action: "database",
            type: "updateCertainObject",
            dataReceived: [req.body.email, { accessKey: token }]
        })
    }).then(x => x.json());
    return res.json({ status: 200 });
});
