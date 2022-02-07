import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./user/userController"

var request = require('request');
export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World!'));


  app.get('/pokemon', (req, res) => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);
  })


}

