const { Pokemon, Type } = require("../db");
const { typesDb } = require("../midelwares/types.js");
const { pokemonsDb } = require("../midelwares/Pokemons.js");

async function createDb() {
  for (type of typesDb) {
    await Type.create({ name: type.name });
  }
  for (pokemon of pokemonsDb) {
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
  return "esta okay";
}

module.exports = { createDb };
