const { Pokemon } = require("../db.js");
const {verifyDuplicatePokemon, verifyPokemonId} = require("../verifications/Pokemon.js");

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