const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MIN_GROUP_NAME_CHARS = 1; // no blank names
const MAX_GROUP_NAME_CHARS = 20; // 20 chosen to make frontend display logic easier
const MIN_PLAYERS_CHARS = 1; // no blank names
const MAX_PLAYERS_CHARS = 16; // 16 chosen to make frontend display logic easier
const MIN_PLAYERS_LENGTH = 1; // less than 1 player is pointless
const MAX_PLAYERS_LENGTH = 100; // 100, UX design decision
const MIN_EXERCISE_NAME_CHARS = 1; // no blank names
const MAX_EXERCISE_NAME_CHARS = 18;  // 18 chosen to make frontend display logic easier
const MIN_EXERCISES_LENGTH = 1; // less than 1 player is pointless
const MAX_EXERCISES_LENGTH = 10;  // 10, UX design decision
const MIN_REPS_COUNT = 1; // less than 1 rep is pointless
const MAX_REPS_COUNT = 999; // 999 chosen to make frontend display logic easier, and also to prevent people from killing themselves reaching crazy reps

const gameSchema = new Schema(
  {
    groupName: {
      type: String,
      minlength: [MIN_GROUP_NAME_CHARS, `Minimum ${MIN_GROUP_NAME_CHARS} character required`],
      maxlength: [MAX_GROUP_NAME_CHARS, `Minimum ${MAX_GROUP_NAME_CHARS} characters required`],
      trim: true,
      required: true
    },
    players: {
      type: [
        {
          type: String,
          minlength: [MIN_PLAYERS_CHARS, `Minimum ${MIN_PLAYERS_CHARS} character required`],
          maxlength: [MAX_PLAYERS_CHARS, `Minimum ${MAX_PLAYERS_CHARS} characters required`],
          required: true
        }
      ],
      validate: [playersLengthLimit, `Must have between ${MIN_PLAYERS_LENGTH} and ${MAX_PLAYERS_LENGTH} players to begin`],
    },
    exercises: {
      type: [
        {
          name: {
            type: String,
            minlength: [MIN_EXERCISE_NAME_CHARS, `Minimum ${MIN_EXERCISE_NAME_CHARS} character required`],
            maxlength: [MAX_EXERCISE_NAME_CHARS, `Minimum ${MAX_EXERCISE_NAME_CHARS} characters required`],
            trim: true,
            required: true
          },
          reps: {
            type: Number,
            min: [MIN_REPS_COUNT, `Minimum ${MIN_REPS_COUNT} rep required`],
            max: [MAX_REPS_COUNT, `Maximum ${MAX_REPS_COUNT} reps required`],
            required: true
          }
        }
      ],
      validate: [exercisesLengthLimit, `Must have between ${MIN_PLAYERS_LENGTH} and ${MAX_PLAYERS_LENGTH} players to begin`],
    }
  },
  {
    timestamps: true
  }
);

function playersLengthLimit(value) {
  const isWithinLimit = MIN_PLAYERS_LENGTH <= value.length && value.length <= MAX_PLAYERS_LENGTH;

  return isWithinLimit;
}

function exercisesLengthLimit(value) {
  const isWithinLimit = MIN_EXERCISES_LENGTH <= value.length && value.length <= MAX_EXERCISES_LENGTH;

  return isWithinLimit;
}

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
