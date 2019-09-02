const mongoose = require('mongoose');

const voiceSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    _id: false,
  },
);

const voiceModel = mongoose.model('Voice', voiceSchema);

module.exports = voiceModel;
