const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rules: {
      numberOfAudiosPerListener: {
        type: Number,
        required: true,
      },
      numberOfMinVotersToAcceptAudio: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  },
);

const competitionModel = mongoose.model('Competition', competitionSchema);

module.exports = competitionModel;
