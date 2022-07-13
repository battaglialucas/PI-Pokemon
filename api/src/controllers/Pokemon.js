const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");
const { apiPokemons } = require("../midelwares/infoApi.js");

async function buscarPokemon(name) {
  nombre = name.toLowerCase();
  let poke = [];
  const db = await Pokemon.findOne({
    where: {
      nombre: nombre,
    },
    include: Tipo,
  });
  if (db) {
    poke = [
      {
        id: db.id,
        idPoke: db.idPoke,
        nombre: db.nombre,
        tipo: db.tipos.map((t) => t.dataValues.name),
      },
    ];
  } else {
    let infoApi;
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((r) => (infoApi = r.data))
      .catch((_) => {
        throw new error("No se encontro el pokemon");
      });
    poke = [
      {
        id: infoApi.id,
        nombre: infoApi.name,
        tipo: infoApi.types.map((t) => t.type.name),
        img: infoApi.sprites.versions["generation-v"]["black-white"].animated
          .front_default,
        fuerza: infoApi.stats[1].base_stat,
      },
    ];
  }

  return poke;
}

async function listPokemonDB() {
  var pokemonDB = await Pokemon.findAll({ include: Tipo });
  pokemonDB = pokemonDB.map(poke =>{
    return{
    ...poke.dataValues,
    tipos: poke.tipos?.map((t) => t.dataValues.name),
  }})
  console.log(pokemonDB) 
  return pokemonDB;
}

async function listPokemonAPI() {
  let cantidadDePokemons = 100;
  var PromesaDePokemons = [];
  for (let i = 0; i < cantidadDePokemons; i++) {
    PromesaDePokemons[i] = axios
      .get(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`)
      .then(
        (res) =>
          (res = {
            idPoke: res.data.id,
            nombre: res.data.name,
            tipo: res.data.types.map((t) => t.slot),
            img: res.data.sprites.versions["generation-v"]["black-white"]
              .animated.front_default,
            fuerza: res.data.stats[1].base_stat,
          })
      )
      .catch((_) => {
        throw new Error("no se pudieron conseguir todos los Pokemons");
      });
  }
  const todasLasPromesas = Promise.all(PromesaDePokemons);
  const pokemonsAPI = await todasLasPromesas;
  console.log(pokemonsAPI);
}

async function crearPokemon({
  name,
  vida,
  fuerza,
  defensa,
  velocidad,
  altura,
  peso,
  tipos,
}) {
  if (
    isNaN(vida) ||
    isNaN(fuerza) ||
    isNaN(defensa) ||
    isNaN(velocidad) ||
    isNaN(altura) ||
    isNaN(peso)
  )
    throw new Error("Alguno de los argumentos no es un numero");

  if (!name) throw new Error("El nombre es obligatorio");

  const existe = await Pokemon.findOne({ where: { nombre: name } });
  if (existe) throw new Error("El nombre del pokemon ya existe");

  const pokemon = await Pokemon.create({
    nombre: name.toLowerCase(),
    vida: Number(vida),
    fuerza: Number(fuerza),
    defensa: Number(defensa),
    velocidad: Number(velocidad),
    altura: Number(altura),
    peso: Number(peso),
  });

  if (!tipos.length) tipos = [1];

  await pokemon.addTipos(tipos);

  return "Pokemon creado";
}

async function getPokemonById(id){
    if (id.length < 4) {
        const infoApi = await axios(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        ).catch((e) => console.log(e));
  
        if (!infoApi.data) return res.json({ info: "No se encontro el pokemon" });

        let pokemonInfo = await Pokemon.Create({
        //   idPoke: infoApi.data.id,
          nombre: infoApi.data.name,
          
          image: infoApi.data.sprites.versions["generation-v"]["black-white"]
            .animated.front_default,
          vida: infoApi.data.stats[0].base_stat,
          fuerza: infoApi.data.stats[1].base_stat,
          defensa: infoApi.data.stats[2].base_stat,
          velocidad: infoApi.data.stats[5].base_stat,
          altura: infoApi.data.height,
          peso: infoApi.data.weight,
          tipo: infoApi.data.types.map((t) => t.type.name),
        })

        console.log(pokemonInfo)
        return (pokemonInfo);
      } else {
        const db = await Pokemon.findByPk(id, { include: Tipo });
  
        if (!db.dataValues.idPoke)
          return res.json({ info: "No se encontro el pokemon" });
  
        const pokemonDb = {
          id: db.dataValues.idPoke,
          name: db.dataValues.nombre,
          tipo: db.dataValues.tipos.map((t) => t.dataValues.name),
          vida: db.dataValues.vida,
          fuerza: db.dataValues.fuerza,
          defensa: db.dataValues.defensa,
          velocidad: db.dataValues.velocidad,
          height: db.dataValues.altura,
          weight: db.dataValues.peso,
        };
        return (pokemonDb);
      }
}

async function createAllPokemons() {
    for (apiPokemon of apiPokemons) {
        console.log(apiPokemon)
      let pokemon = await Pokemon.create({nombre: apiPokemon.nombre, image: apiPokemon.img, fuerza: apiPokemon.fuerza});

    }
    return apiPokemons;
  }

module.exports = {buscarPokemon, listPokemonDB, listPokemonAPI, crearPokemon, getPokemonById, createAllPokemons};
