const { Router } = require('express');
const pokemonRoutes = require('./pokemon.js');
const typeRoutes = require('./type.js');
const createRoutes = require('./createDb.js');

const router = Router();

router.use('/pokemon', pokemonRoutes);
router.use('/type', typeRoutes);
router.use('/createDb', createRoutes);

module.exports = router;
