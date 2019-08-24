const mongoose = require('mongoose');

const audioSchema = mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    voice: {
      type: String,
      requied: true,
    },
    users: [
      {
        _id: false,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        point: {
          type: Number,
        },
      },
    ],
    sentence: {
      type: String,
      required: true,
      ref: 'Sentence',
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    averagePoint: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const audioModel = mongoose.model('Audio', audioSchema);

module.exports = audioModel;
