const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamestateSchema = new Schema(
  // TODO LEFTOFF fix up gamepage so that it GETs this document, or POSTS one with 0 reps if it doesn't
  {
    players: {
      type: [
        {
          name: {
            type: String
          },
          exercises: {
            type: [
              {
                name: {
                  type: String
                },
                completedReps: {
                  type: Number
                }
              }
            ]
          }
        }
      ]
    },
    gameId: {
      type: String,
      required: true
    }
    // TODO expire at 00:00 local time
    // expireAt: { type: Date, default: new Date('May 11, 2020 19:46:00') }
  },
  {
    timestamps: true
  }
);

gamestateSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

const Gamestate = mongoose.model('Gamestate', gamestateSchema);

module.exports = Gamestate;
