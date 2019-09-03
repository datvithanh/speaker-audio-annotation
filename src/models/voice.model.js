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
    _id: false,
    timestamps: true,
  },
);

const voiceModel = mongoose.model('Voice', voiceSchema);

module.exports = voiceModel;
