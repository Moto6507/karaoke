"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginIntern = exports.loginPage = void 0;
const express_1 = __importDefault(require("express"));
exports.loginPage = express_1.default.Router().get('/login', (req, res) => {
    res.render('login.html');
}), exports.loginIntern = express_1.default.Router().post('/login', (req, res) => {
    if (req.session)
        return;
    //req.session.token = (Math.random() * 900000000).toString(36).substr(0, 10);
});
