import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./auth/authController"

var request = require('request');
export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World! AUTH'));


  app.post('/login', (req, res) => {
    const username = req.body.name
    const password = req.body.password
    UserController.generateToken(username)

    /*var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);*/
  })


}

