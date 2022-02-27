import * as express from "express"
import { User } from "./model/User";
import * as UserController from "./user/userController"
import * as InvitationController from "./invitation/invitationController"
import {verifyAdmin,verifyUser} from './verifyToken'
import { Invitation } from "./model/Invitation";

var request = require('request');
const jwtDecode = require("jwt-decode");

export const register = (app: express.Application) => {

  app.get('/', (req, res) => res.send('Hello World! USER'));
 
  /**
    * @swagger
    * /register:
    *   post:
    *     summary: register a User.
    *     description:
    *       Try to create a User using name and password.
    *       If the name is unique , the password is hashed and the user is created.
    *     requestBody:
    *       description: Necessary informations to accept - a  name and a password.
    *       required: true
    *       
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               name:
    *                 type: string
    *                 description: The name of the user you want to create.
    *                 example: Samir3
    *               password:
    *                 type: string
    *                 description: The password of the user you want to create.
    *                 example: keypass
    *    
    *     responses:
    *       200:
    *         description: User joined.
    *         content:
    *           application/json:
    *             schema:
    *               type: string
    *               description: The response.
    *               example: "Samir3 account succesfuly created"
    *                 
    *       409:
    *         description: "Username already used"
    * 
    *       500:
    *         description: Unknown error.
    */
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


  /**
    * @swagger
    * /users:
    *   get:
    *     summary: All User.
    *     description:
    *       Try to get All non admin Users in DB .
    *    
    *     responses:
    *       200:
    *         description: A list of User.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                     description: The user ID.
    *                     example: 1
    *                   name:
    *                     type: string
    *                     description: The name of the user.
    *                     example: "Samir"
    *                   score:
    *                     type: integer
    *                     description: The score of the user.
    *                     example: 0
    *    
    * 
    *       500:
    *         description: Unknown error.
    */
  app.get('/users', verifyUser,(req, res) => {
     res.status(200).json(UserController.listUsers())
  })

  /**
    * @swagger
    * /invitations:
    *   get:
    *     summary: All Invitation.
    *     description:
    *       Try to get All my Invitation .
    *    
    *     responses:
    *       200:
    *         description: A list of Invitation.
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                     description: The invite ID.
    *                     example: 1
    *                   fromId:
    *                     type: string
    *                     description: The id of the sender.
    *                     example: "1"
    *                   fromName:
    *                     type: integer
    *                     description: The name of the sender.
    *                     example: "Samir"
    *                   matchId:
    *                     type: integer
    *                     description: The match Id.
    *                     example: 1
    *                   invitRecipient:
    *                     type: integer
    *                     description: The id of the recipient of the invitation.
    *                     example: 2
    *  
    *       500:
    *         description: Unknown error.
    */
  app.get('/invitations', verifyUser,(req, res) => {
    res.status(200).json(InvitationController.listInvitation(jwtDecode(req.headers['auth-token']).id))
 })

  app.post('/userInDb', (req, res) => {
    try {
      let json = UserController.userInDb(req.body.id)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })



  app.post('/newInvitation', (req, res) => {
    try {
      const newInvite: Invitation = req.body
      let json = InvitationController.newInvitation(newInvite)
      res.status(200).json(json)
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })
  

  /**
    * @swagger
    * /joinEmptyMatch:
    *   post:
    *     summary: Join EmptyMatch.
    *     description:
    *       Try to join an empty match using matchId.
    *       If the matchId is correct, the match is updated with our name.
    *     requestBody:
    *       description: Necessary informations to accept -  an matchId.
    *       required: true
    *       
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               matchId:
    *                 type: integer
    *                 description: The empty match ID to join.
    *                 example: 1
    *    
    *     responses:
    *       200:
    *         description: Match joined.
    *         content:
    *           application/json:
    *             schema:
    *               type: string
    *               description: The response.
    *               example: 
    *                 - value: "You succesfully joined the match 1"
    *                 - value: "You can't join a match against yourself"
    *       409:
    *         description: "Match not found"
    * 
    *       500:
    *         description: Unknown error.
    */
  app.post('/joinEmptyMatch',verifyUser, (req, res) => {
    try {
      const matchId:number = req.body.matchId
      let myId = jwtDecode(req.headers['auth-token']).id;
      InvitationController.joinEmptyMatch(matchId,myId).then(
        (response) => res.status(200).json(response)
      ) 
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })


  /**
    * @swagger
    * /acceptInvitation:
    *   post:
    *     summary: Accept Invitation of Match.
    *     description:
    *       Try to accept an invitation using inviteId.
    *       If the inviteId is correct, the match is updated and the invite is removed from available invite.
    *     requestBody:
    *       description: Necessary informations to accept -  an inviteId.
    *       required: true
    *       
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               inviteId:
    *                 type: integer
    *                 description: The invite ID to accept.
    *                 example: 1
    *    
    *     responses:
    *       200:
    *         description: Match joined and invite removed.
    *         content:
    *           application/json:
    *             schema:
    *               type: string
    *               description: The response.
    *               example: 
    *               - value : "Match 6 joined and Invitation 1 removed from available invites."
    *               - value : "Match 6 does not need a second player."
    *       409:
    *         description : "This invitation doesn't exist."
    *       500:
    *         description: Unknown error.
    */
  app.post('/acceptInvitation',verifyUser, (req, res) => {
    try {
      const inviteId:number = req.body.inviteId
      let myId = jwtDecode(req.headers['auth-token']).id;
      console.log(inviteId)
      var  json = InvitationController.acceptInvitation(inviteId,myId).then(
        (response) => res.status(200).json(response)
      )
    }
    catch (error) {
      res.status(409).json({ "status": false, "result": error.message })
    }
  })

 
  app.get('/pokemon', verifyUser,(req, res) => {
    var url = 'https://pokeapi.co/api/v2/pokemon/';
    req.pipe(request(url)).pipe(res);
  })
  

  /**
    * @swagger
    * /users/clear:
    *   get:
    *     summary: Clear User table.
    *     description:
    *       Try to clear User table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table User cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('/users/clear',verifyAdmin, (req, res) => {
    res.status(200).json(UserController.clearDB())
  })

    /**
    * @swagger
    * /invitation/clear:
    *   get:
    *     summary: Clear Invitation table.
    *     description:
    *       Try to clear Invitation table. You need to be admin to use this route
    *    
    *     responses:
    *       200:
    *         description: table Invitation cleared.
    *       500:
    *         description: Unknown error.
    */
  app.get('/invitation/clear',verifyAdmin, (req, res) => {
    res.status(200).json(InvitationController.clearDB())
  })
  

}
