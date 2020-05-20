const Game = require('../models/game');

const read = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findOne({_id: id});
    res.send(game);
  } catch (err) {
    res.status(404).send(err);
  }
};

const create = async (req, res) => {
  const {
    groupName,
    players,
    exercises,
    gameStateId
  } = req.body;
  
  try {
    const newGame = await Game.create({
      groupName,
      players,
      exercises,
      gameStateId
    });
    res.send(newGame);
  } catch (err) {
    res.status(418).send(err);
  }
};

module.exports = {
  read,
  create
}
