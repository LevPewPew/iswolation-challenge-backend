const express = require('express');
const router = express.Router();

router.use('/games', require('./games-routes'));

module.exports = router;
