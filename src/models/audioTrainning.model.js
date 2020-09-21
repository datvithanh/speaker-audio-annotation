const mongoose = require('mongoose');

const audioTrainningSchema = mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    rawOriginContent: {
      type: String,
    },
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Competition',
    },
    transcripts: [
      {
        _id: false,
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        content: {
          type: String,
          required: true,
        },
        numberOfVotes: {
          type: Number,
          default: 0,
        },
      },
    ],
    numberOfEditors: {
      type: Number,
      default: 0,
    },
    editors: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const audioTrainningModel = mongoose.model(
  'AudioTrainning',
  audioTrainningSchema,
);

module.exports = audioTrainningModel;
