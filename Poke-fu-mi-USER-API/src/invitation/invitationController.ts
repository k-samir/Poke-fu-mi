import { Invitation } from "../model/Invitation"
import InvitationRepository from "./invitationRepository"
import got from 'got';

const invitationRepository = new InvitationRepository()

const listInvitation = (userId: number) => {
  return invitationRepository.getAllInvitations(userId)
}

const clearDB = () => {
  return invitationRepository.clearDB()
}
const newInvitation = (invite: Invitation) => {
  var res = invitationRepository.createInvitation(invite.fromId, invite.fromName, invite.matchId, invite.invitRecipient)
  return res;
}

const acceptInvitation = async (inviteId: number, myId: number) => {
  //check if invite still exist
  var inviteExist = invitationRepository.inviteExist(inviteId, myId)
  console.log("EXIST : " + inviteExist)
  try {
    if (inviteExist) {
      // get matchId
      var res = invitationRepository.getMatchId(inviteId)
      console.log("res" + res)

      // update status if player 2 join in match
      const update = await got.post('http://match:5000/acceptFromInvite', {
        json: {"matchId":res}
      });

      console.log(JSON.parse(update.body))

      // if match joined 
      if (JSON.parse(update.body)) {
        // delete invite in db
        invitationRepository.removeInvitation(inviteId)
        return "Match " + res + " joined and Invitation " + inviteId + " removed from available invites."
      }
      else {
        return "Match " + res + " does not need a second player."
      }

    }
    else {
      return "This invitation doesn't exist."
    }
  }
  catch (error) {
    console.log(error.message)
  }
}


const joinEmptyMatch = async (matchId: number, myId: number) => {
  // check if matchOwner != myId
  const owner = await got.post('http://match:5000/getMatchOwner', {
    json: {
      matchId: matchId
    }
  });

  if (JSON.parse(owner.body) != myId && JSON.parse(owner.body) != "null") {

    // update player 2 in match
    const update = await got.post('http://match:5000/addPlayer2', {
      json: {
        id_player2: myId,
        matchId: matchId
      }
    });

    // if match found 
    if (JSON.parse(update.body)) {
      return "You succesfully joined the match " + matchId
    }
    else {
      return "Match " + matchId + " does not need a second player."
    }
  }
  else if (JSON.parse(owner.body) == myId) {
    return "You can't join a match against yourself"
  }
  else {
    return "Match not found"
  }
}



export { listInvitation, clearDB, newInvitation, acceptInvitation, joinEmptyMatch }

