import * as express from "express"
import { Match } from "./model/Match";
import * as MatchController from "./match/matchController"
import {verifyUser,verifyAdmin} from './verifyToken'


var request = require('request');
export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World! MATCH'));
  app.get('/a', verifyUser,(req, res) => res.send('Hello World! MATCH USER'));
  app.get('/b', verifyAdmin,(req, res) => res.send('Hello World! MATCH ADMIN'));
  
}

