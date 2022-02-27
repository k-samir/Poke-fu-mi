import * as express from "express"
import got from 'got';

import { User } from "./model/User";
import * as AuthController from './auth/authController';

var request = require('request');
export const register = (app: express.Application) => {

  app.get('/', (req, res) => res.send('Hello World! AUTH'));

  /**
    * @swagger
    * /login:
    *   post:
    *     summary: Log in.
    *     description:
    *       Try to connect to USER Microservice using name and password.
    *       If the connection is successful, a secret token is returned, which may be used in further requests.
    *     requestBody:
    *       description: Necessary informations to log in - an name and a password.
    *       required: true
    *       
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               username:
    *                 type: string
    *                 description: The name the player registered with.
    *                 example: Samir1
    *               password:
    *                 type: string
    *                 description: The password used by the player to log in.
    *                 example: pass
    *     responses:
    *       200:
    *         description: A secret token, allowing access to other functionalities of the API.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                token:
    *                  type: string
    *                  description: The secret token.
    *                  example: eyJhbGciLiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IlNhbWlyMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjQ1OTcxMDMwLCJleHAiOjE2NDU5NzQ2MzB9.WQ9dGfnQ6HIncV4s_uH9Nou8DA9IbU9XVQNrmdyu5hk
    *       409:
    *          description: Login failed for user.
    *       500:
    *         description: Unknown error.
    */
  app.post('/login', async (req, res) => {
    got.post('http://user:5000/login', {
      json: req.body
    }).then(response => response.body)
      .then(body => JSON.parse(body))
      .then(json => AuthController.signJWT({ id: json.id, name: json.name, role: json.role }))
      .then(token => res.header('auth-token', token).send(token))
      .catch(error => res.status(error.response.statusCode || 500).send(error.response.body || "Erreur"))
  })

  app.post("/verify", (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');
    try {
      const verified = AuthController.verifyJWT(token);
      res.send(verified)
    }
    catch (err) {
      res.status(400).send('Invalid token');
    }
  })


}

