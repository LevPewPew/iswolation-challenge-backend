const express = require('express');
const router = express.Router();

router.use('/games', require('./games-routes'));
router.use('/gamestates', require('./gamestates-routes'));

module.exports = router;
