import DeckRepository from "./deckRepository"

const  deckRepository = new DeckRepository()


const listDeck = () => {
    return deckRepository.getAllDecks() 
}

const clearDB = () => {
    return deckRepository.clearDB() 
  }


export { listDeck,clearDB}

