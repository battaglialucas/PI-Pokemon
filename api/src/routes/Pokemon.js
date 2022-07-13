const { Router } = require("express");
const router = Router();
const {getAllPokemons, getPokemonByName, getPokemonById, createPokemon, updatePokemon, deletePokemon} = require("../controllers/Pokemon.js");

router.get("/", async (req, res) => {
  try {
    let { name } = req.query;
    let pokemons = name ? await getPokemonByName(name) : await getAllPokemons();
    res.status(200).send(pokemons);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    res.status(200).send(await getPokemonById(id));
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let data = req.body;
    res.status(200).send(await createPokemon(data));
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = req.body;
    res.status(200).send(await updatePokemon(id, data));
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    res.status(200).send(await deletePokemon(id));
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
