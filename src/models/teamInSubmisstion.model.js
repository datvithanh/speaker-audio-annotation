const mongoose = require('mongoose');

const teamInSubmissionSchema = mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      required: true,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    submitted: {
      type: Boolean,
      required: true,
      default: false,
    },
    linkApi: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const teamInSubmisstionModel = mongoose.model(
  'TeamInSubmission',
  teamInSubmissionSchema,
);

module.exports = teamInSubmisstionModel;
