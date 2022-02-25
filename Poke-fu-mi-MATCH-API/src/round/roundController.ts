import RoundRepository from "./roundRepository"

const  roundRepository = new RoundRepository()


const listRounds = () => {
    return roundRepository.getAllRounds() 
}

const clearDB = () => {
    return roundRepository.clearDB() 
  }

export { listRounds,clearDB }

