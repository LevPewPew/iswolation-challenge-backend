const Gamestate = require('../models/gamestate');
const Game = require('../models/game');

const read = async (req, res) => {
  const { gameId } = req.params;

  try {
    const gamestate = await Gamestate.findOne({gameId: gameId});
    if (!gamestate) {
      console.log("this RAN");
      const game = await Game.findOne({_id: gameId});
      console.log(game);
      const players = buildGamestatePlayers(game);
      const newGamestate = await Gamestate.create({
        players,
        gameId
        // expireAt: moment().add(60, 'seconds')
      });
      console.log("BAMBAM");
      console.log(newGamestate);
      res.send(newGamestate);
    }
    res.send(gamestate);
  } catch (err) {
    res.status(404).send(err);
  }
}

const create = async (req, res) => {
  const {
    players,
  } = req.body;
  
  try {
    const newGamestate = await Gamestate.create({
      players,
      // expireAt: moment().add(60, 'seconds')
    });
    res.send(newGamestate);
  } catch (err) {
    res.status(400).send(err);
  }
}

function buildGamestatePlayers(game) {
  const playerNames = game.players.map((playerName) => playerName);
  const exerciseNames = game.exercises.map((exercise) => exercise.name);
  const exercises = []
  const players = [];
  exerciseNames.forEach((exerciseName) => {
    exercises.push(
      {
        name: exerciseName,
        completedReps: 0
      }
    );
  });
  playerNames.forEach((playerName) => {
    players.push(
      {
        name: playerName,
        exercises
      }
    );
  });

  return players;
}

module.exports = {
  read,
  create
}
