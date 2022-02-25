import * as express from "express"
import * as MatchController from "./match/matchController"
import * as PokemonController from "./pokemon/pokemonController"
import * as DeckController from "./deck/deckController"
import * as RoundController from "./round/roundController"
import {verifyUser,verifyAdmin} from './verifyToken'


var request = require('request');
export const register = ( app: express.Application ) => {
  app.get('/', (req, res) => res.send('Hello World! MATCH'));
  app.get('/a', verifyUser,(req, res) => res.send('Hello World! MATCH USER'));
  app.get('/b', verifyAdmin,(req, res) => res.send('Hello World! MATCH ADMIN'));
  

 app.get('match/clear',verifyAdmin, (req, res) => {
    res.status(200).json(MatchController.clearDB())
  })
  app.get('deck/clear',verifyAdmin, (req, res) => {
    res.status(200).json(DeckController.clearDB())
  })
  app.get('pokemon/clear',verifyAdmin, (req, res) => {
    res.status(200).json(PokemonController.clearDB())
  })
  app.get('round/clear',verifyAdmin, (req, res) => {
    res.status(200).json(RoundController.clearDB())
  })


}

