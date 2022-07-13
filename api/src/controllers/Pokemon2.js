const { Pokemon } = require("../db.js");
const axios = require("axios");
const {verifyPokemonName, verifyDuplicatePokemon, verifyPokemonId} = require("../verifications/Pokemon.js");

async function listPokemonAPI() {
    let cantidadDePokemons = 86;
    var apiPokemons = [];
    for (let i = 0; i < cantidadDePokemons; i++) {
        apiPokemons[i] = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i +301}/`)
        apiPokemons[i] = {
              id: apiPokemons[i].data.id,
              nombre: apiPokemons[i].data.name,
              image: apiPokemons[i].data.sprites.versions["generation-v"]["black-white"].animated.front_default,
              vida: apiPokemons[i].data.stats[0].base_stat,
              fuerza: apiPokemons[i].data.stats[1].base_stat,
              defensa: apiPokemons[i].data.stats[2].base_stat,
              velocidad: apiPokemons[i].data.stats[5].base_stat,
              altura: apiPokemons[i].data.height,
              peso: apiPokemons[i].data.weight,
              tipo: apiPokemons[i].data.types.map((t) => t.type.name),
            }
    }
    return (apiPokemons);
}

async function getAllPokemons() { 
    let pokemons = await Pokemon.findAll({ include: [{association:'types', through: { attributes: [] }}]})
    if(!pokemons.length) throw new Error ("no hay pokemons")
    return pokemons
}

async function getPokemonByName(name) {
    let pokemon = await Pokemon.findOne({where:{ name }, include: [{association:'types', through: { attributes: [] }}]})
    if(!pokemon) throw new Error ("no hay un pokemon con ese nombre")
    return pokemon
}

async function getPokemonById(id) {
    await verifyPokemonId(id)
    let pokemon = await Pokemon.findByPk(id, {include: [{association:'types', through: { attributes: [] }}]})
    if(!pokemon) throw new Error ("no hay un pokemon con ese id")
    return pokemon
}

async function createPokemon(data){
    await verifyDuplicatePokemon(data.name)
    let pokemon = await Pokemon.create(data)
    return pokemon
}

async function updatePokemon(id, data){
    await verifyPokemonId(id)
    let pokemon = await Pokemon.update(data,{where: { id }})
    return pokemon
}

async function deletePokemon(id){
    await verifyPokemonId(id)
    await Pokemon.destroy({where:{ id }})
    return "el pokemon fue eliminado"
}

module.exports = {getAllPokemons, getPokemonByName, getPokemonById, createPokemon, updatePokemon, deletePokemon};