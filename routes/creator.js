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
exports.creator = express_1.default.Router().get('/k/creator', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield fetch("http://localhost:8080/api/v3/get/infos/" + ((_a = req.session) === null || _a === void 0 ? void 0 : _a.token), {
        method: 'GET'
    }).then((x) => x.json()).catch(x => console.log(x));
    res.render('desktop/creatorPortal.html', {
        user: user.user
    });
}));
