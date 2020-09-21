const mongoose = require('mongoose');

const competitionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rules: {
      numberOfListenersPerAudio: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

const competitionModel = mongoose.model('Competition', competitionSchema);

module.exports = competitionModel;
