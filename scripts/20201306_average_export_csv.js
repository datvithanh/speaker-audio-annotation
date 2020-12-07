/* eslint-disable no-console */
require('dotenv');
require('../src/db/mongoose');
const { ObjectId } = require('mongoose').Types;

const fs = require('fs');

const Audio = require('../src/models/audio.model');

(async () => {
  let data = await Audio.aggregate([
    {
      $match: {
        test: {
          $in: [
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
  ]);

  
  data = data.map(item => ({ ...item, averagePoint: item.averagePoint.toFixed(3) }))
  console.log(data);

  fs.appendFileSync('scripts/average_point.csv', 'voice,average_point\n');
  for (const item of data) {
    fs.appendFileSync('scripts/average_point.csv', Object.values(item).join(',') + '\n');
  }

  process.exit(1);
})();
