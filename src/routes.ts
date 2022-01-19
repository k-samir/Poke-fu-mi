import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./user/userController"

var request = require('request');
export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));

  app.get('/user', (req, res) => {
	  res.status(200).json(UserController.listUsers())
  })



  app.get('/pokemon', (req, res) => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);
  })


  app.post('/register', (req, res) => {
	const newUser: User = req.body    
  try{
      let json = UserController.addUser(newUser)
	    res.status(200).json(json)
  }
  catch(error){
      res.status(409).json({ "status": false, "result": error.message })
  }

  })  

  app.post('/login', (req, res) => {
      const newUser: User = req.body   
      let logged = UserController.login(newUser)

      if(logged){
        res.status(200).json({ "status": true, "result": 'Login successfuly!' })
      }
      else{
        res.status(409).json({ "status": false, "result": "Login failed for user!" })
      }
  })  

}

