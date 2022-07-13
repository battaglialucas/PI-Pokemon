const { Pokemon } = require("../db");

function verifyPokemonData({nombre, image, vida, fuerza, defensa, velocidad, altura, peso, types}) {
  if (!name) throw new Error("a name is required for the Pokemon"); 
  return name.toLowerCase()
}

async function verifyDuplicatePokemon(name) {
  let PokemonInDb = await Pokemon.findOne({ where: { name } });
  if (PokemonInDb) throw new Error(`the Pokemon ${PokemonInDb.name}  already exists`);
}

async function verifyPokemonId(id) {
  if (!id) throw new Error("you must provide a Pokemon id");
  if(!/^[1-9][0-9]*$/.test(id)) throw new Error("the id must be a number");

  let PokemonInDb = await Pokemon.findByPk(id);
  if (!PokemonInDb) throw new Error("the id does not correspond to an existing Pokemon");

  return PokemonInDb;
}

module.exports = {verifyPokemonData, verifyDuplicatePokemon, verifyPokemonId}