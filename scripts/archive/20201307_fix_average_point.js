require('../src/db/mongoose');
const Audio = require('../src/models/audio.model');

(async () => {
  const audios = await Audio.find({
    test: { $in: ['5fcd0328a765493f035d186e', '5fcd1aa70705f2d8b5f42227'] }, // dev
    // test: { $in: ['5fc895cfd2eeea6aecd95bee', '5fc897bfd2eeea6aecd95dd0'] }, // production
  }).lean();

  console.log('audios.length', audios.length);

  await Promise.all(
    audios.map(async (audio, index) => {
      console.log(`${index + 1}/${audios.length}`);
      let numberOfReviews = 0;
      let totalPoint = 0;
      console.log({ test: audio.test, audio: audio._id });
      audio.users.forEach(user => {
        if (user.point) {
          numberOfReviews += 1;
          totalPoint += user.point;
        }
      });

      let averagePoint = null;
      if (numberOfReviews !== 0) {
        averagePoint = totalPoint / numberOfReviews;
      }

      await Audio.findByIdAndUpdate(audio._id, {
        averagePoint,
        numberOfReviews,
      });
    }),
  );

  process.exit();
})();
