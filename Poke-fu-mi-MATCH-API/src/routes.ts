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

  /**
    * @swagger
    * /match:
    *   get:
    *     summary: All Match.
    *     description:
    *       Try to get All Match in DB.
    *    
    *     responses:
    *       200:
    *         description: A list of match.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                     description: The match ID.
    *                     example: 1
    *                   deck_p1_id:
    *                     type: integer
    *                     description: The ID of the player 1 Deck.
    *                     example: 1
    *                   deck_p2_id:
    *                     type: integer
    *                     description: The ID of the player 2 Deck.
    *                     example: 2
    *                   id_player1:
    *                     type: integer
    *                     description: The ID of the player 1.
    *                     example: 2
    *                   id_player2:
    *                     type: integer
    *                     description: The ID of the player 2.
    *                     example: 3
    *                   currentRound:
    *                     type: integer
    *                     description : The round Number
    *                     exemple : -1
    *                   status:
    *                     type: string
    *                     description: the state of the match.
    *                     example: READY_START
    * 
    *       500:
    *         description: Unknown error.
    */
  app.get('/match', verifyUser, (req, res) => {
    res.status(200).json(MatchController.listMatch())
  })

  app.post('/acceptFromInvite', async (req, res) => {
    try {
      const matchId = req.body.matchId
      console.log(matchId)
      let json = MatchController.player2Accept(matchId)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })


  
  app.post('/getMatchOwner', async (req, res) => {
    try {
      const matchId = req.body.matchId
      let json = MatchController.getMatchOwner(matchId)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })


  app.post('/matchExists',verifyUser, async (req, res) => {
    try {
      const matchId = req.body.matchId
      let json = MatchController.matchExists(matchId)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })



  app.post('/addPlayer2',async (req, res) => {
    try {
      const player2 = req.body.id_player2
      const matchId = req.body.matchId

      let json = MatchController.addPlayer2(player2,matchId)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })



  /**
    * @swagger
    * /createMatch:
    *   post:
    *     summary: Create a Match.
    *     description:
    *       Try to create a match using id_player2.
    *       If the id_player2 is correct, the match is created and the invite is sent to the player2.
    *       If id_player2 is null, an empty match is created
    *     requestBody:
    *       description: Necessary informations to accept -  an id_player2.
    *       required: true
    *       
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               id_player2:
    *                 type: integer
    *                 description: The player2 ID .
    *                 example: 1
    *    
    *     responses:
    *       200:
    *         description: Match created and invite sent.
    *         content:
    *           application/json:
    *             schema:
    *               type: string
    *               description: The response.
    *               example: "Match 6 created, Invitation 1 has been sent, waiting for player2 to accept."
    *   
    *       500:
    *         description: Unknown error.
    */
  app.post('/createMatch',verifyUser, async (req, res) => {
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

  /**
    * @swagger
    * /match/clear:
    *   get:
    *     summary: Clear Match table.
    *     description:
    *       Try to clear Match table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table match cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('match/clear', verifyAdmin, (req, res) => {
    res.status(200).json(MatchController.clearDB())
  })

  /**
    * @swagger
    * /deck/clear:
    *   get:
    *     summary: Clear Deck table.
    *     description:
    *       Try to clear Deck table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table Deck cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('deck/clear', verifyAdmin, (req, res) => {
    res.status(200).json(DeckController.clearDB())
  })

    /**
    * @swagger
    * /pokemon/clear:
    *   get:
    *     summary: Clear Pokemon table.
    *     description:
    *       Try to clear Pokemon table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table Pokemon cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('pokemon/clear', verifyAdmin, (req, res) => {
    res.status(200).json(PokemonController.clearDB())
  })

  
    /**
    * @swagger
    * /round/clear:
    *   get:
    *     summary: Clear Round table.
    *     description:
    *       Try to clear Round table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table Round cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('round/clear', verifyAdmin, (req, res) => {
    res.status(200).json(RoundController.clearDB())
  })


}

