import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./user/userController"
import got from 'got';


var request = require('request');

export const register = (app: express.Application) => {

  app.get('/', (req, res) => res.send('Hello World! USER'));

  app.get('/user', (req, res) => {
    res.status(200).json(UserController.listUsers())
  })

  app.get('/clear', (req, res) => {
    res.status(200).json(UserController.clearDB())
  })

  


  app.post('/register', (req, res) => {
    const newUser: User = req.body
    try {
      let json = UserController.addUser(newUser)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })

  app.post('/login', async (req, res) => {
    const newUser: User = req.body
    let user = await UserController.login(newUser)
    if (user) {
      res.status(200).json(user)
    }
    else {
      res.status(409).json({ "status": false, "result": "Login failed for user!" })
    }
  })

  app.get('/pokemon', verify,(req, res) => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);
  })
  
  async function verify(req: express.Request, res: express.Response,next: () => void){
    
    try{
      const data = await got.post('http://auth:5000/verify', {
      json: req.body,
      headers: req.headers
    });
    console.log(JSON.parse(data.body).role);
    if(JSON.parse(data.body).role === 'user'){
      next();
    }
    else{
      res.send('Access Denied');
    }
    // TODO SAME WITH ADMIN
  }
  catch(err){res.send("Access Denied")}
  }

}
