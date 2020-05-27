const Gamestate = require('../models/gamestate');
const Game = require('../models/game');

const read = async (req, res) => {
  // IMPORTANT: for some reason headers messes around with camel case, so this header must be localmidnight not localMidnight
  const  { localmidnight }  = req.headers;
  const { gameId } = req.params;

  try {
    const gamestate = await Gamestate.findOne({gameId: gameId});
    if (gamestate) {
      res.send(gamestate);
    } else {
      try {
        const game = await Game.findOne({_id: gameId});
        const players = buildGamestatePlayers(game);
        const newGamestate = await Gamestate.create({
          players,
          gameId,
          expireAt: localmidnight
        });
        res.send(newGamestate);
      } catch (err) {
        res.status(418).send(err);
      }
    }
  } catch (err) {
    res.status(418).send(err);
  }
};

const update = async (req, res) => {
  const { gameId } = req.params;
  const {
    player,
    exercise,
    completedReps
  } = req.body;

  try {
    await Gamestate.updateOne(
      {gameId},
      {$set: {"players.$[player].exercises.$[exercise].completedReps": completedReps}},
      {arrayFilters: [{"player.name": player}, {"exercise.name": exercise}]}
    );
    res.status(200).send(`Successfully changed ${player}'s ${exercise} reps to completedReps`);
  } catch (err) {
    res.status(418).send(err);
  }
};

function buildGamestatePlayers(game) {
  const playerNames = game.players.map((playerName) => playerName);
  const exerciseNames = game.exercises.map((exercise) => exercise.name);
  const exercises = [];
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
  update
};
