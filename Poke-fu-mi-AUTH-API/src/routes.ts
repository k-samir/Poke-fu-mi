import * as express from "express"
import got from 'got';

import { User } from "./model/User";
import * as AuthController from './auth/authController';

var request = require('request');
export const register = (app: express.Application) => {
  app.get('/', (req, res) => res.send('Hello World! AUTH'));

  app.post('/login', async (req, res) => {

    got.post('http://user:5000/login', {
      json: req.body
    }).then(response => response.body)
    .then(body => JSON.parse(body))
    .then(json => AuthController.signJWT({ name: json.name, role: json.role }))
    .then(token => res.header('auth-token',token).send(token))
    .catch(error => res.status(error.response.statusCode || 500).send(error.response.body || "Erreur"))

  })

  app.post("/verify", (req, res) => {
    
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try{
      const verified = AuthController.verifyJWT(token);
      res.send(verified)
    }
    catch(err){
      res.status(400).send('Invalid token');
    }

  })


}

