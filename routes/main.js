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
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const undici_1 = require("undici");
const recommendationAlgorithm_1 = require("../utils/recommendationAlgorithm");
const algorithm = new recommendationAlgorithm_1.Algorithm();
exports.main = express_1.default.Router().get('/k', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.token))
        return res.redirect('/login');
    var agent = express_useragent_1.default.parse(req.headers['user-agent']).isMobile;
    const user = yield (0, undici_1.fetch)("http://localhost:8080/api/v3/get/infos/" + ((_b = req.session) === null || _b === void 0 ? void 0 : _b.token), {
        method: 'GET',
        dispatcher: new undici_1.Agent({ connectTimeout: 30000 })
    }).then((x) => x.json()).catch(x => console.log(x)), all = yield (0, undici_1.fetch)("http://localhost:8080/api/v3/get/infos/all", {
        method: 'GET'
    }).then(x => x.json()), allPosts = yield (0, undici_1.fetch)("http://localhost:8080/api/v3/get/infos/all?post=true", {
        method: 'GET'
    }).then(x => x.json());
    if (user.status !== 200)
        return res.send("aaaa");
    algorithm.register(allPosts, all, user);
    const algorithmGerated = algorithm.gerate();
    if (agent)
        res.render("main.html", {
            user: user.user,
            algorithm: algorithmGerated
        });
    else
        res.render("desktop/main.html", {
            user: user.user,
            algorithm: algorithmGerated.join(' ')
        });
}));
