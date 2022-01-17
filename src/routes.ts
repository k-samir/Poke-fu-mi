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


  app.post('/user', (req, res) => {
	const newUser: User = req.body    
	res.status(200).json(UserController.addUser(newUser))
  })  


}

