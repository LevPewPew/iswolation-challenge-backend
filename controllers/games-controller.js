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
      players: forceUniquePlayerNames(players),
      exercises: forceUniqueExerciseNames(exercises),
      gameStateId
    });
    res.send(newGame);
  } catch (err) {
    res.status(418).send(err);
  }
};

function forceUniquePlayerNames(names) {
  const dupeNames = duplicates(count(names));
  let newNames = [];
  
  names.forEach((e, i) => {
    if (dupeNames.includes(e)) {
      newNames.push(`${e} (${i + 1})`);
    } else {
      newNames.push(e);
    }
  });

  return newNames;
}

function forceUniqueExerciseNames(exercises) {
  const exerciseNames = exercises.map((e) => e.name);
  const dupeExerciseNames = duplicates(count(exerciseNames));
  let newExerciseNames = [];

  exerciseNames.forEach((e, i) => {
    if (dupeExerciseNames.includes(e)) {
      newExerciseNames.push(`${e} (${i + 1})`);
    } else {
      newExerciseNames.push(e);
    }
  });
  const newExercises = exercises.map((e, i) => (
    {name: newExerciseNames[i], reps: e.reps}
  ));

  return newExercises;
}

const count = (array) => (
  array.reduce((accumulator, currentValue) => ({ ...accumulator,
    [currentValue]: (accumulator[currentValue] || 0) + 1
  }), {})
);

const duplicates = (obj) => (
  Object.keys(obj).filter((e) => obj[e] > 1)
);

module.exports = {
  read,
  create
};
