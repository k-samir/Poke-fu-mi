
import MatchRepository from "./matchRepository"
import got from 'got';

const matchRepository = new MatchRepository()

const addMatch = async (matchOwnerId: number, matchOwnerName: string, id_player2: number) => {
  var idMatch
  if (id_player2 == null) {
    idMatch = matchRepository.createEmptyMatch(matchOwnerId)
    return "Empty Match " + idMatch + " created, waiting for player2 to join.";
  }
  else {
    idMatch = matchRepository.createMatch(matchOwnerId, id_player2)
    // send invite
    const addInvite = await got.post('http://user:5000/newInvitation', {
      json: {
        fromId: matchOwnerId,
        fromName: matchOwnerName,
        matchId: idMatch,
        invitRecipient: id_player2
      }
    }).json()

    nextMatchStatus(idMatch)
    return "Match " + idMatch + " created, Invitation " + addInvite + " has been sent, waiting for player2 to accept.";
  }

}
const nextMatchStatus = (matchId: number) => {
  return matchRepository.nextMatchStatus(matchId)
}

const addPlayer2 = (player2: number, idMatch: number): boolean => {
  // check no Plyaer2
  if (matchRepository.needPlayer2(idMatch)) {
    matchRepository.addPlayer2(player2, idMatch)
    return true
  }
  else {
    return false
  }
}
const matchExists = (idMatch: number) => {
  return matchRepository.matchExists(idMatch)
}
const getMatchOwner = (idMatch: number) => {
  var matchExist = matchRepository.matchExists(idMatch)
  console.log("############# " + matchExist)
  if (matchExist == true) {
    return matchRepository.getMatchOwner(idMatch)
  }
  else{
    return "null"

  }

}
const player2Accept = (idMatch: number) => {
  // check need confirm invite
  console.log("player2A " + idMatch)
  const need = matchRepository.needPlayer2Confirm(idMatch)
  
  if (need) {
    nextMatchStatus(idMatch)
    return true
  }
  else {
    return false
  }
}


const listMatch = () => {
  return matchRepository.getAllMatch()
}

const clearDB = () => {
  return matchRepository.clearDB()
}

export { listMatch, clearDB, addMatch, addPlayer2, player2Accept, getMatchOwner,matchExists }

