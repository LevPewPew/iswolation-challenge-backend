const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamestateSchema = new Schema(
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
    },
    expireAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

gamestateSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });

const Gamestate = mongoose.model('Gamestate', gamestateSchema);

module.exports = Gamestate;
