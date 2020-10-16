const mongoose = require('mongoose');

const dataTrainExportSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    accessibleTeam: [
      {
        _id: false,
        teamId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const dataTrainExportModel = mongoose.model(
  'DataTrainExport',
  dataTrainExportSchema,
);

module.exports = dataTrainExportModel;
