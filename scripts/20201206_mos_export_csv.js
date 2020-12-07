/* eslint-disable no-console */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Audio = require('../src/models/audio.model');
const User = require('../src/models/user.model');
const Test = require('../src/models/test.model');
const Sentence = require('../src/models/sentence.model');
require('dotenv');

require('../src/db/mongoose');

const csvWriter = createCsvWriter({
  path: 'src/static/mos.csv',
  header: [
    { id: '_id', title: 'ID' },
    { id: 'test', title: 'test' },
    { id: 'link', title: 'link' },
    { id: 'voice', title: 'voice' },
    { id: 'sentence', title: 'sentence' },
    { id: 'createdAt', title: 'createdAt' },
    { id: 'email', title: 'email' },
    { id: 'name', title: 'name' },
    { id: 'listens', title: 'listens' },
    { id: 'point', title: 'point' },
  ],
});

(async () => {
  const audios = await Audio.find({
    // test: { $in: ['5fcd0328a765493f035d186e', '5fcd1aa70705f2d8b5f42227'] }, // dev
    test: { $in: ['5fc895cfd2eeea6aecd95bee', '5fc897bfd2eeea6aecd95dd0'] }, // production
  }).lean();

  const data = [];
  await Promise.all(
    audios.map(async audio => {
      await Promise.all(
        audio.users.map(async user => {
          const userObject = await User.findById(user.userId);
          const testObject = await Test.findById(audio.test);
          const sentenceObject = await Sentence.findById(audio.sentence);

          data.push({
            ...audio,
            email: userObject.email,
            name: userObject.name,
            point: Math.floor(user.point),
            test: testObject.name,
            sentence: sentenceObject.content,
            listens: user.listens,
          });
        }),
      );
    }),
  );
  const dataReturned = data.map(a => {
    delete a.users;
    delete a.updatedAt;
    delete a.averagePoint;
    delete a.__v;
    delete a.numberOfReviews;
    return { ...a };
  });

  await csvWriter.writeRecords(dataReturned);

  // console.log({ dataReturned });

  process.exit();
})();
