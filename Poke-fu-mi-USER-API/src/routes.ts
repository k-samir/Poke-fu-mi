import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./user/userController"
import got from 'got';
import {verify} from './verifyToken'

var request = require('request');

export const register = (app: express.Application) => {

  app.get('/', (req, res) => res.send('Hello World! USER'));

  // m'inscrire à la plateforme avec un nom d'utilisateur unique.
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

 // me connecter à la plateforme utilisant mon nom d’utilisateur et un mot de passe
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

  app.get('/users', verify,(req, res) => {
    res.status(200).json(UserController.listUsers())
  })

  app.get('/clear', (req, res) => {
    res.status(200).json(UserController.clearDB())
  })

 
  app.get('/pokemon', verify,(req, res) => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);
  })
  

}
