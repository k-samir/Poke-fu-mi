import MatchRepository from "./matchRepository"

const matchRepository = new MatchRepository()


const listUsers = () => {
    return matchRepository.getAllMatch() 
}


export { listUsers}

