import got from 'got';
import * as express from "express"
import * as UserController from "./user/userController"

export async function verify(req: express.Request, res: express.Response,next: () => void){
    
    try{
      const data = await got.post('http://auth:5000/verify', {
      json: req.body,
      headers: req.headers
    });
    console.log(JSON.parse(data.body).role);
    if(JSON.parse(data.body).role === 'user'){
        if(UserController.userInDb(JSON.parse(data.body).name)){
            next();
        }
        else{
            res.send('Access Denied : Unknown User');
        }
    }
    else{
      res.send('Access Denied : Login to use the app');
    }
    // TODO SAME WITH ADMIN
  }
  catch(err){res.send("Access Denied")}
  }
