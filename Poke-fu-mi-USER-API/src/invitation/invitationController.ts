import InvitationRepository from "./invitationRepository"

const invitationRepository = new InvitationRepository()

const listInvitation = (userId:string) => {
    return invitationRepository.getAllInvitations(userId) 
}

const clearDB = () => {
    return invitationRepository.clearDB() 
  }


export { listInvitation,clearDB}

