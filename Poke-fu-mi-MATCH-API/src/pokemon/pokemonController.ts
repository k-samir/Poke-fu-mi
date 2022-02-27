import PokemonRepository from "./pokemonRepository"

const  pokemonRepository = new PokemonRepository()


const listPokemon = () => {
    return pokemonRepository.getAllPokemon() 
}

const clearDB = () => {
    return pokemonRepository.clearDB() 
  }


export { listPokemon,clearDB}

