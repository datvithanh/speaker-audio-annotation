const mongoose = require('mongoose');

const sentenceSchema = mongoose.Schema(
  {
    _id: String,
    content: {
      type: String,
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
  },
  {
    timestamps: true,
    _id: false,
  },
);

const sentenceModel = mongoose.model('Sentence', sentenceSchema);

module.exports = sentenceModel;
