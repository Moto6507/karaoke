"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algorithm = void 0;
class Algorithm {
    constructor() {
        this.user = {};
        this.users = [];
        this.posts = [];
    }
    register(posts, users, user) {
        this.posts = posts;
        this.users = users;
        this.user = user;
    }
    cosmetics() {
    }
    gerate() {
        try {
            return this.posts.map((x) => {
                const user = this.users.find((h) => h.identifier === x.by);
                const commentsOfPost = () => {
                    return x.comments.map((x) => {
                        const user = this.users.find((h) => h.identifier === x.by);
                        x = Object.assign({ user }, x);
                        return x;
                    });
                };
                return `<div class="musicCard">
        <div class="option">
        <i class='icon-share' onclick=""></i>
        <i class='fa-comment icon-comment' onclick="commentInterface(${commentsOfPost()})"></i> ${x.comments.length} 
        <i class='icon-options'></i></div>
         <img onclick="window.location.href='/k/player?song=${x.id}'" src="http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}" crossorigin='anonymous' class="background">
         <div class='cardInfo'>
           <div class='static'><i class='icon-music'></i> ${x.listeners}</div>
           <div class='static'><i class='icon-star'></i> ${x.stars}</div>
           <h2 class='title'>${x.title}</h2><h5 class='author'>${user.username}</h5>
         </div>
        </div>`;
            });
        }
        catch (e) {
            console.log(e);
            return "I can't generate the algorithm";
        }
    }
}
exports.Algorithm = Algorithm;