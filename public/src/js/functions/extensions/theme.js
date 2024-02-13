   async function setTheme(themeValue, immersiveTheme) {
      let [ player, title, bar, progressBar, firstDuration, slash, secondDuration, playButton, icons ] = [
        document.getElementsByClassName('player')[0],
        document.getElementsByClassName('title')[0],
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
      if(userTheme.includes('im')) return setTheme(null,userTheme.slice(2,3));
      setTheme(userTheme)
   }