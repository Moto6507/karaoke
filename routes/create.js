"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = void 0;
const express_1 = __importDefault(require("express"));
const express_useragent_1 = __importDefault(require("express-useragent"));
exports.createAccount = express_1.default.Router().get('/create', (req, res) => {
    var _a;
    var agent = express_useragent_1.default.parse(req.headers['user-agent']).isMobile;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token)
        return res.redirect('/k');
    res.render('createAccount.html', {
        screen: agent ? '' : `style='margin: 100px; margin-top: 0'`
    });
});
