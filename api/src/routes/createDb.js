const { Router } = require("express");
const router = Router();
const { createDb } = require('../controllers/createDb.js');

router.post("/", async (req, res) => {
  try {
    const { password } = req.body
    res.status(200).send(await createDb(password));
  } catch (error) {
    res.status(404).json(error.message);
  }
});


module.exports = router;