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
exports.profile = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
exports.profile = express_1.default.Router().get('/k/profile/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.token))
        return res.redirect('/k');
    const userName = req.params.user;
    const accessUser = yield fetch("http://localhost:8080/api/v3/get/infos/" + ((_b = req.session) === null || _b === void 0 ? void 0 : _b.token), {
        method: 'GET'
    }).then(x => x.json());
    const user = yield fetch("http://localhost:8080/api/v3/get/infos/" + userName, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Cache-Control': 'max-age=500'
        },
        cache: "default",
        method: "GET"
    }).then(x => x.json());
    if (!user.user)
        return res.sendFile(path_1.default.resolve() + '/views/desktop/noFound.html');
    const posts = yield fetch("http://localhost:8080/api/v3/actions", {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        method: "POST",
        cache: "default",
        body: JSON.stringify({
            action: "database",
            type: "all",
            isPost: true
        })
    }).then(x => x.json()), userPosts = [];
    posts.data.map((x) => {
        if (x.by === user.user.identifier)
            userPosts.push(x);
    });
    const iFollow = ((_c = accessUser.follow) === null || _c === void 0 ? void 0 : _c.find((x) => x === user.identifier)) ? true : false;
    res.render('desktop/profile.html', {
        user: user.user,
        accessUser: accessUser.user,
        iFollow,
        posts: userPosts,
        statics: `<div class='statics'><strong>${posts.data.length}</strong> posts</div><div class='statics noBorder'><strong>${user.user.followers.length}</strong> Followers</div>`
    });
}));
