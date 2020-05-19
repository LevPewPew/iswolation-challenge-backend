const express = require('express');
const router = express.Router();
const { read, create } = require('../controllers/gamestates-controller');

router.get('/:gameId', read);
router.post('/', create);

module.exports = router;
