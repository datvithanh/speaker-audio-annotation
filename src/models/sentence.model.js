const mongoose = require('mongoose');

const sentenceSchema = mongoose.Schema(
  {
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
  },
);

const sentenceModel = mongoose.model('Sentence', sentenceSchema);

module.exports = sentenceModel;
