import MatchRepository from "./matchRepository"

const matchRepository = new MatchRepository()


const listUsers = () => {
    return matchRepository.getAllMatch() 
}

const clearDB = () => {
    return matchRepository.clearDB() 
  }

export { listUsers,clearDB}

