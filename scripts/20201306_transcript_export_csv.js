/* eslint-disable no-console */
require('dotenv');
const fs = require('fs');
const moment = require('moment');

require('../src/db/mongoose');

const Audio = require('../src/models/audio.model');
const User = require('../src/models/user.model');
const Test = require('../src/models/test.model');
const Sentence = require('../src/models/sentence.model');

(async () => {
  let data = [];

  const firstTranscriptId = '5fc89918d2eeea6aecd9602a';
  const secondTranscriptId = '5fc89a77d2eeea6aecd96103';
  const thirdTranscriptId = '5fc89b7bd2eeea6aecd961dc';

  const firstTranscriptTest = await Test.findById(firstTranscriptId);
  const secondTranscriptTest = await Test.findById(secondTranscriptId);
  const thirdTranscriptTest = await Test.findById(thirdTranscriptId);

  const audios = await Audio.find({
    test: { $in: [firstTranscriptId, secondTranscriptId, thirdTranscriptId] },
  });
  console.log('audios.length', audios.length);

  for (const [index, audio] of audios.entries()) {
    const { _id, link, voice, sentence: sentenceId, users } = audio;
    const testId = audio.test.toString();

    console.log((index + 1) / audios.length * 100);

    let testName;
    switch (testId) {
      case firstTranscriptId: testName = firstTranscriptTest.name; break;
      case secondTranscriptId: testName = secondTranscriptTest.name; break;
      case thirdTranscriptId: testName = thirdTranscriptTest.name; break;
      default: break;
    }

    const pieceOfData = await Promise.all(users.map(async ({ userId, text, listens, lastUpdate }) => {
      const user = await User.findById(userId);
      const sentence = await Sentence.findById(sentenceId);

      return {
        test: testName,
        audioId: _id,
        link,
        voice,
        sentence: sentence.content,
        listens,
        email: user.email,
        name: user.name,
        text,
        lastUpdatedAt: lastUpdate ? moment(lastUpdate).format('DD-MM-YYYY HH:mm') : '',
      };
    }));

    data = [...data, ...pieceOfData];
  }

  fs.appendFileSync('scripts/transcript.csv', 'test,audio_id,link,voice,sentence,listens,email,name,text,last_updated_at\n');
  for (const item of data) {
    fs.appendFileSync('scripts/transcript.csv', Object.values(item).join(',') + '\n');
  }

  process.exit(1);
})();
