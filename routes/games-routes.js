const express = require('express');
const router = express.Router();
const { read, create } = require('../controllers/games-controller');

router.get('/:id', read);
router.post('/', create);

module.exports = router;
