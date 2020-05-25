const express = require('express');
const router = express.Router();
const { read, update } = require('../controllers/gamestates-controller');

router.get('/:gameId', read);
router.put('/:gameId/add-gains', update);

module.exports = router;
