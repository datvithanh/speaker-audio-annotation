const mongoose = require('mongoose');

const teamInCompetitionSchema = mongoose.Schema(
  {
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Competition',
    },
    numberOfCompletedAudio: {
      type: Number,
      default: 0,
    },
    status: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const teamInCompetitionModel = mongoose.model(
  'TeamInCompetition',
  teamInCompetitionSchema,
);

module.exports = teamInCompetitionModel;
