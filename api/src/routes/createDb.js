const { Router } = require("express");
const router = Router();
const { createDb } = require('../controllers/createDb.js');

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await createDb());
  } catch (error) {
    res.status(404).json(error.message);
  }
});


module.exports = router;