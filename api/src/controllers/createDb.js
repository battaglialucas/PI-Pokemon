const { Pokemon, Type } = require("../db");
const { typesDb } = require("../midelwares/types.js");
const { pokemonsDb } = require("../midelwares/Pokemons.js");
const { CREATE_DB_PASSWORD } = process.env;

async function createDb(password) {
  if(CREATE_DB_PASSWORD != password ) throw new Error ('please enter the correct password to initialize the database')
  await createTypesDb();
  await createPokemonsDb();

  return 'the database has been created successfully';
}

async function createTypesDb() {
  for (let type of typesDb) {
    await Type.create({ name: type.name });
  }
}

async function createPokemonsDb() {
  for (let pokemon of pokemonsDb) {
    let poke = await Pokemon.create({
      name: pokemon.nombre,
      image: pokemon.image,
      life: pokemon.vida,
      strength: pokemon.fuerza,
      defense: pokemon.defensa,
      speed: pokemon.velocidad,
      height: pokemon.altura,
      weight: pokemon.peso,
    });
    await poke.setTypes(pokemon.tipo)
  }
}

module.exports = { createDb };
