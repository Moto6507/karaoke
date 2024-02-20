import express from 'express'

export const creator = express.Router().get('/k/creator', async(req: any, res: any) => {
    const 
   user = await fetch("http://localhost:8080/api/v3/get/infos/" + req.session?.token, {
    method: 'GET'
 }).then((x: any) =>x.json()).catch(x=>console.log(x))
   res.render('desktop/creatorPortal.html', {
    user: user.user
   })
})