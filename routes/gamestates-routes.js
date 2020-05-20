const express = require('express');
const router = express.Router();
const { read, create, update } = require('../controllers/gamestates-controller');

router.get('/:gameId', read);
router.post('/', create);
router.put('/:gameId/add-gains', update);

module.exports = router;
