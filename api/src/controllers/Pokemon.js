const { Pokemon } = require("../db.js");
const {verifyDuplicatePokemon, verifyPokemonId} = require("../verifications/Pokemon.js");
const { Op } = require("sequelize");

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

async function getPokemonsFiltered(data){

    let { page, size, name, type, order} = data
    let conditions = {include: [{association:'types', through: { attributes: [] }}]}

    size = size > 0 ? Number.parseInt(size) : 1
    page = page > 0 ? (Number.parseInt(page) - 1) : 0
    conditions.limit= size
    conditions.offset= page * size

    if(type) conditions.include[0].where = {name : {[Op.like]: `%${type}%`}}
    if(order) {order = order.split(","); conditions.order = [[order[0], order[1]]];}
    if(name) conditions.where = {name : {[Op.like]: `%${name}%`}}
    let pokemonFiltered = await Pokemon.findAll(conditions);

    return pokemonFiltered
}

module.exports = {getAllPokemons, getPokemonByName, getPokemonById, createPokemon, updatePokemon, deletePokemon, getPokemonsFiltered};