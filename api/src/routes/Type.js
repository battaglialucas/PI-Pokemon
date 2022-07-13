const { Router } = require("express");
const router = Router();
const {getAllTypes, getTypeById, getTypeByName} = require('../controllers/Type.js');

router.get("/", async (req, res) => {
  try {
    let { name } = req.query
    let Type = name ? await getTypeByName(name) : await getAllTypes()
    res.status(200).send(Type);
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    res.status(200).send(await getTypeById(id));
  } catch (error) {
    res.status(404).json(error.message);
  }
});

module.exports = router;