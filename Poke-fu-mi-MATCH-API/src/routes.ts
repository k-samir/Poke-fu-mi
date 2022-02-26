import * as express from "express"
import * as MatchController from "./match/matchController"
import * as PokemonController from "./pokemon/pokemonController"
import * as DeckController from "./deck/deckController"
import * as RoundController from "./round/roundController"
import got from 'got';

import { verifyUser, verifyAdmin } from './verifyToken'
import { Match } from "./model/Match"


var request = require('request');

const jwtDecode = require("jwt-decode");
export const register = (app: express.Application) => {
  app.get('/', (req, res) => res.send('Hello World! MATCH'));

  app.get('/admin', verifyAdmin, (req, res) => res.send('Hello World! MATCH ADMIN'));

  app.get('/match', verifyUser, (req, res) => {
    res.status(200).json(MatchController.listMatch())
  })

  app.post('/createMatch', async (req, res) => {
    console.log(req.body.id_player2);
    try {
      const player2 = req.body.id_player2
      let myName = jwtDecode(req.headers['auth-token']).name;
      let myId = jwtDecode(req.headers['auth-token']).id;

      if (req.body.id_player2 != null) {

        const inDb = await got.post('http://user:5000/userInDb', {
          json: { id: player2 }
        }).json();

        if (!inDb) {
          throw new Error("Please use a real player2")
        }
        else { 
          if(myId == player2){
            throw new Error("You can't create a match against yourself")
          }   
         MatchController.addMatch(myId, myName, player2).then(
            (response) => res.status(200).json(response)
          )         
        }
      }
      else{
        MatchController.addMatch(myId, myName,null).then(
          (response) => res.status(200).json(response)
        )   
      }

    }

    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })


  app.get('match/clear', verifyAdmin, (req, res) => {
    res.status(200).json(MatchController.clearDB())
  })
  app.get('deck/clear', verifyAdmin, (req, res) => {
    res.status(200).json(DeckController.clearDB())
  })
  app.get('pokemon/clear', verifyAdmin, (req, res) => {
    res.status(200).json(PokemonController.clearDB())
  })
  app.get('round/clear', verifyAdmin, (req, res) => {
    res.status(200).json(RoundController.clearDB())
  })


}

