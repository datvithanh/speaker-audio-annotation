/* eslint-disable no-console */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Audio = require('../src/models/audio.model');
const User = require('../src/models/user.model');
const Test = require('../src/models/test.model');
const Sentence = require('../src/models/sentence.model');
require('dotenv');

require('../src/db/mongoose');

const csvWriter = createCsvWriter({
  path: 'src/static/transcript.csv',
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
    { id: 'text', title: 'transcript' },
  ],
});

(async () => {
  const audios = await Audio.find({
    // test: { $in: ['5fcda797fed7ab0a702ce800', '5fcda7b6fed7ab0a702ce820'] }, // dev
    test: {
      $in: [
        '5fc89918d2eeea6aecd9602a',
        '5fc89a77d2eeea6aecd96103',
        '5fc89b7bd2eeea6aecd961dc',
      ],
    }, // production
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
            text: user.text,
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
