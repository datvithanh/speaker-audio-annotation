const { ObjectId } = require('mongodb');
const fs = require('fs');

require('../src/db/mongoose');

const AudioTrainning = require('../src/models/audioTrainning.model');
const { SRC_PATH } = require('../src/constant');

(async () => {
  const audios = await AudioTrainning.find({
    competitionId: ObjectId('5f8abbe7eac0975d5889f8cc'),
  });

  await Promise.all(
    audios.map(async audio => {
      audio.textLength = audio.rawOriginContent.length;
      const stats = fs.statSync(`${SRC_PATH}/static${audio.link}`);
      await AudioTrainning.findByIdAndUpdate(audio._id, {
        textLength: audio.rawOriginContent.length,
        sizeInKilobytes: stats.size / 1000,
        label: '',
      });
    }),
  );

  process.exit();
})();
