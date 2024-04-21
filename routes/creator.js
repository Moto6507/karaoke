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
exports.creator = void 0;
const express_1 = __importDefault(require("express"));
const express_useragent_1 = __importDefault(require("express-useragent"));
exports.creator = express_1.default.Router().get('/k/creator', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.token))
        return res.redirect('/k');
    let user = yield fetch("http://localhost:8080/api/v3/get/infos/" + ((_b = req.session) === null || _b === void 0 ? void 0 : _b.token), {
        method: 'GET'
    }).then((x) => x.json()).catch(x => console.log(x)), postsMapped = yield fetch("http://localhost:8080/api/v3/actions", {
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
    }).then(x => x.json()), posts = [];
    postsMapped.data.map((x) => {
        if (x.by === user.user.identifier)
            posts.push(x);
    });
    var agent = express_useragent_1.default.parse(req.headers['user-agent']).isMobile;
    if (agent)
        res.render('creatorPortal.html', {
            user: user.user,
            postsName: posts.length >= 1 ? posts.map((x) => x.title) : null,
            postsLenght: posts.length,
            yourPosts: posts.length >= 1 ? posts.map((x, i = 0) => `<div class='containerDevelop'><h3 class='title titleWhite'>${x.title}</h3> song #${i++}
    <br>
    <h5 class='title'>Some statics</h5>
    <div class='staticBox'>
      listeners: ${x.listeners}
    </div>
    </div>`).join('') : null
        });
    else
        res.render('desktop/creatorPortal.html', {
            user: user.user,
            postsName: posts.length >= 1 ? posts.map((x) => x.title) : null,
            postsLenght: posts.length,
            yourPosts: posts.length >= 1 ? posts.map((x, i = 0) => `<div class='containerDevelop'><h3 class='title titleWhite'>${x.title}</h3> song #${i++}
    <br>
    <h5 class='title'>Some statics</h5>
    <div class='staticBox'>
      listeners: ${x.listeners}
    </div>
    </div>`).join('') : null
        });
}));
