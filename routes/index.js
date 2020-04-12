const express = require('express');
const router = express.Router();

const index = (req, res) => {
  res.send('hello world');
}

router.get('/', index);

// define routes here, this will mean anything in the categories-routes.js file (yet to be created) will assume that /categories will prepend the route path defined in categories-routes.js
router.use('/categories', require('./categories-routes'));
router.use('/games', require('./games-routes'));

module.exports = router;