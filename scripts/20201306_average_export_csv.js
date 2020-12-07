/* eslint-disable no-console */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { ObjectId } = require('mongoose').Types;
const Audio = require('../src/models/audio.model');
require('dotenv');

require('../src/db/mongoose');

const csvWriter = createCsvWriter({
  path: 'src/static/average-point.csv',
  header: [
    { id: '_id', title: 'voice' },
    { id: 'averagePoint', title: 'AveragePoint' },
  ],
});

(async () => {
  const audios = await Audio.aggregate([
    {
      $match: {
        test: {
          $in: [
            // dev
            // ObjectId('5fcd0328a765493f035d186e'),
            // ObjectId('5fcd1aa70705f2d8b5f42227'),

            // production
            ObjectId('5fc895cfd2eeea6aecd95bee'),
            ObjectId('5fc897bfd2eeea6aecd95dd0'),
          ],
        },
      },
    },
    {
      $group: {
        _id: '$voice',
        averagePoint: { $avg: '$averagePoint' },
      },
    },
    {
      $project: {
        _id: '$_id',
        averagePoint: { $round: ['$averagePoint', 3] },
      },
    },
  ]);

  await csvWriter.writeRecords(audios);

  process.exit();
})();
