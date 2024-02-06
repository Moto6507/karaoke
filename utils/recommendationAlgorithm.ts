export class Algorithm {
     user: object;
     users: object[];
     posts: object[];
    constructor () {
      this.user = {};
      this.users = [];
      this.posts = [];
    }
   register(posts: object[], users: object[], user: object) {
     this.posts = posts;
     this.users = users;
     this.user = user;
   }
   cosmetics() {
     
   }
   gerate(): Array<string> | string {
     try {
     return this.posts.map((x: any)=>{
    const user: any = this.users.find((h: any)=>h.identifier===x.by);
    const commentsOfPost = x.comments.map((x: any)=>{
     const user = this.users.find((h: any)=>h.identifier===x.by);
     x = { user, ...x }
     return x
     })
       return `<div class="musicCard">
        <div class="option">
        <i class='icon-share-nodes' onclick=""></i>
        <i class='icon-comment' onclick="commentInterface(${commentsOfPost})"></i> ${x.comments.length} 
        <i class='icon-ellipsis'></i></div>
         <img onclick="window.location.href='/k/player?song=${x.id}'" src="http://localhost:8080/api/v3/get/media/thumbnails/${x.thumbnail}" crossorigin='anonymous' class="background">
         <div class='cardInfo'>
           <div class='static'><i class='icon-music'></i> ${x.listeners}</div>
           <div class='static'><i class='icon-star'></i> ${x.stars}</div>
           <h2 class='title'>${x.title}</h2><h5 class='author'>${user.username}</h5>
         </div>
        </div>`
     })
   } catch(e) {
     console.log(e)
     return "I can't generate the algorithm"
    }
   }
  }