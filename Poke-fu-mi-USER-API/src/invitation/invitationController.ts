import { Invitation } from "../model/Invitation"
import InvitationRepository from "./invitationRepository"

const invitationRepository = new InvitationRepository()

const listInvitation = (userId:number) => {
    return invitationRepository.getAllInvitations(userId) 
}

const clearDB = () => {
    return invitationRepository.clearDB() 
  }
  const newInvitation = (invite: Invitation) => {
    var res = invitationRepository.createInvitation(invite.fromId,invite.fromName,invite.matchId,invite.invitRecipient)
    return res;
  }


export { listInvitation,clearDB,newInvitation}

