import got from 'got';
import * as express from "express"


export async function verifyUser(req: express.Request, res: express.Response,next: () => void){
  return verify(req,res,next,"user");
}

export async function verifyAdmin(req: express.Request, res: express.Response,next: () => void){
  return verify(req,res,next,"admin");
}


async function verify(req: express.Request, res: express.Response,next: () => void,typeOfCheck:string){
    
    try{
      const data = await got.post('http://auth:5000/verify', {
      json: req.body,
      headers: req.headers
    });

    if(JSON.parse(data.body).role === typeOfCheck){

      const inDb = await got.post('http://user:5000/userInDb', {
        json: { name : JSON.parse(data.body).name }
      });

      if(JSON.parse(inDb.body)){
          next();
      }
      else{
          res.send('Access Denied : Unknown User, create an account');
      }
    }
    else{
      res.send('Access Denied : You need to be "' + typeOfCheck + '" to access this page');
    }
  }
  catch(err){res.send("Access Denied : Login to use the app")}
  }
