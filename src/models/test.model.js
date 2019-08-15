const mongoose = require('mongoose');

const testSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    voices: {
      type: [String],
    },
    numberOfSentences: {
      type: Number,
      required: true,
    },
    minSentences: {
      type: Number,
      required: true,
    },
    minPeopleListenAudio: {
      type: Number,
      required: true,
    },
    minPeopleJoin: {
      type: Number,
      required: true,
    },
    accessModifier: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        _id: false,
      },
    ],
    dateOpened: {
      type: Date,
      required: true,
    },
    dateClosed: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const testModel = mongoose.model('Test', testSchema);

module.exports = testModel;
