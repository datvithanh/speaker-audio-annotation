const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    competitionId: {
      ref: 'Competition',
      type: mongoose.Schema.Types.ObjectId,
    },
    timeExpired: {
      type: Date,
      required: true,
    },
    accessibleTeam: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const submisstionModel = mongoose.model('Submission', submissionSchema);

module.exports = submisstionModel;
