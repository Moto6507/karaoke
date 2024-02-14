   async function setTheme(themeValue, immersiveTheme) {
    const
    sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay)),
    getAverageColor = (img) => {
  var context = document.createElement('canvas').getContext('2d');
  if (typeof img == 'string') {
      var src = img;
      img = new Image;
      img.setAttribute('crossOrigin', ''); 
      img.src = src;
  }
  context.imageSmoothingEnabled = true;
  context.drawImage(img, 0, 0, 1, 1);
  const [r, g, b] = context.getImageData(0, 0, 1, 1).data.slice(0,3);
  return `rgb(${r}, ${g}, ${b})`
},
    pSBC = (p,c0,c1,l) => {
  let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
  if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
  if(!this.pSBCr)this.pSBCr=(d)=>{
      let n=d.length,x={};
      if(n>9){
          [r,g,b,a]=d=d.split(","),n=d.length;
          if(n<3||n>4)return null;
          x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
      }else{
          if(n==8||n==6||n<4)return null;
          if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
          d=i(d.slice(1),16);
          if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
          else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
      }return x};
  h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
  if(!f||!t)return null;
  if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
  else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
  a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
  if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
  else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
};
      let [ player, title, bar, progressBar, firstDuration, slash, secondDuration, playButton, icons ] = [
        document.getElementsByClassName('player')[0],
        document.getElementsByClassName('titleInOverlay')[0],
        document.getElementsByClassName('bar')[0],
        document.getElementsByClassName('progress-bar')[0],
        document.getElementsByClassName('duration')[0],
        document.getElementById('slash'),
        document.getElementsByClassName('duration')[1],
        document.getElementsByClassName('play-button')[0],
        [].slice.call(document.getElementsByClassName('icon'))
        ],
        themeTypes = [
      "rgb(255,152,22)", // fall
      "rgb(0,100,208)", //ocean
      "rgb(185,51,255)", // lavender
      "rgb(251,255,121)", // sunhine
      "rgb(87,255,180)", // mint
      "rgb(189,212,255)", //sky
      "rgb(255,189,255)" //yogurt
      ],
        immersiveTypes = [
      "#F9D5C6", //kawai
      "#EEAF61", //sunset
      "#0066CC", // classic (cubic)
      "#FCC3F4" //lolipop
       ],
        themeColor = themeValue;
       if(!themeValue && immersiveTheme !== undefined) themeColor = immersiveTypes[immersiveTheme]
       else themeColor = themeTypes[themeValue]
       let
         setKawai = async() => {
        title.style.color = pSBC(0.40, "#FFEDD6")
       // song title
        bar.style.background = pSBC(-0.50, pSBC(0.35, "#F2BFCA"))
       //bar background
       progressBar.style.background = "#FFEDD6"
       //progress bar color
       firstDuration.style.color = "#BDD4D1"
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = themeColor
       console.log(themeColor)
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = "#FFEDD6"
       })
        },
         setSunSet = async() => {
      title.style.color = pSBC(0.40, "#FB9062")
       // song title
      bar.style.background = pSBC(-0.50, pSBC(0.35, "#EE5D6C"))
       //bar background
       progressBar.style.background = "#EE5D6C"
       //progress bar color
       firstDuration.style.color = "#CE4993"
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = `linear-gradient(${pSBC(-0.40, "#EEAF61")}, ${pSBC(-0.40, "#FB9062")}, ${pSBC(-0.60, "#EE5D6C")}, ${pSBC(-0.70, "#CE4993")}, ${pSBC(-0.80, "#6A0D83")}, #000000)`
       console.log(themeColor)
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = pSBC(0.50, "#6A0D83")
       })
        },
         setDeepOcean = async() => {
      title.style.color = pSBC(0.40, "#003366")
       // song title
      bar.style.background = pSBC(0.40, pSBC(-0.50, themeColor))
       //bar background
       progressBar.style.background = themeColor
       //progress bar color
       firstDuration.style.color = "#0059B3"
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = `linear-gradient(${pSBC(-0.40, "#004080")}, ${pSBC(-0.40, "#003366")}, ${pSBC(-0.40, "#001A33")}, #000000)`
       console.log(themeColor)
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = pSBC(0.50, "#004080")
       })
        },
         setLolipop = async() => {
      title.style.color = pSBC(0.40, "#b3effd")
       // song title
      bar.style.background = pSBC(-0.50, pSBC(0.35, "#98fdbe"))
       //bar background
       progressBar.style.background = "#98fdbe"
       //progress bar color
       firstDuration.style.color = "#ff4c97"
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = `linear-gradient(to right bottom, #98fdbe 30%, ${themeColor} 10% 70%, #b3effd 40%)`
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = "#f98de9"
       })
        },
         setWithThumbnailColor = async() => {
      themeColor = getAverageColor(document.getElementsByClassName('thumbnail')[0]);
      title.style.color = pSBC(0.40, themeColor)
       // song title
      bar.style.background = pSBC(-0.80, themeColor)
       //bar background
       progressBar.style.background = themeColor
       //progress bar color
       firstDuration.style.color = themeColor
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = `linear-gradient(${pSBC(-0.40, themeColor)}, #000000)`
       console.log(themeColor)
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = pSBC(0.50, themeColor)
       })
        };
       if(immersiveTheme!==undefined) switch(immersiveTheme) {
        case 0: setKawai()
        break;
        case 1: setSunSet()
        break;
        case 2: setDeepOcean() 
        break;
        case 3: setLolipop()
        break;
        case 4: setWithThumbnailColor();
        break;
    }
    else {
      title.style.color = pSBC(0.40, themeColor)
       // song title
      bar.style.background = pSBC(-0.50, pSBC(0.35, themeColor))
       //bar background
       progressBar.style.background = themeColor
       //progress bar color
       firstDuration.style.color = themeColor
       // progress durarion
       slash.style.color = pSBC(-0.50, themeColor)
      // Slash that splits the timers
       secondDuration.style.color = pSBC(-0.70, themeColor)
       // progress static duration
       await sleep(250)
       player.style.background = `linear-gradient(${pSBC(-0.40, themeColor)}, #000000)`
       console.log(themeColor)
       // player background
       playButton.style.background = pSBC(0.30, themeColor)
       playButton.style.transform = "rotate(360deg)"
       // play button
       icons.map(x=>{
         x.style.color = pSBC(0.50, themeColor)
       })
      }
    }
   function defineTheme(userTheme) {
      //theme is Number (0 - 6) or String im[0-4]
      userTheme = String(userTheme)
      console.log(userTheme)
      if(userTheme.includes('im')) {
        immersiveThemeCount = Number(userTheme.slice(2,3));
        return setTheme(null,immersiveThemeCount);
      }
      themeCount = Number(userTheme)      
      setTheme(userTheme)
   }