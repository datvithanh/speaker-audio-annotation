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

  const firstMosId = '5fc895cfd2eeea6aecd95bee';
  const secondMosId = '5fc897bfd2eeea6aecd95dd0';

  const firstMosTest = await Test.findById(firstMosId);
  const secondMosTest = await Test.findById(secondMosId);
  
  const audios = await Audio.find({
    test: { $in: [firstMosId, secondMosId] },
  })
  console.log('audios.length', audios.length);

  for (const [index, audio] of audios.entries()) {
    const { _id, link, voice, sentence: sentenceId, users } = audio;
    const testId = audio.test.toString();

    console.log((index + 1) / audios.length * 100);

    let testName = testId === firstMosTest ? firstMosTest.name : secondMosTest.name;

    const pieceOfData = await Promise.all(users.map(async ({ userId, point, listens, lastUpdate }) => {
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
        point: Math.floor(point),
        lastUpdatedAt: lastUpdate ? moment(lastUpdate).format('DD-MM-YYYY HH:mm') : '',
      };
    }));

    data = [...data, ...pieceOfData];
  }

  fs.appendFileSync('scripts/mos.csv', 'test,audio_id,link,voice,sentence,listens,email,name,point,last_updated_at\n');
  for (const item of data) {
    fs.appendFileSync('scripts/mos.csv', Object.values(item).join(',') + '\n');
  }

  process.exit(1);
})();
