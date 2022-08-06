/* eslint-disable no-console */
const AudioTrainning = require('../src/models/audioTrainning.model');

require('../src/db/mongoose');

(async () => {
  try {
    const countAudioTraining = await AudioTrainning.countDocuments({
      label: 'train',
    });
    console.log('Counted the quantity of audio have train label. ');

    const randomAudios = await AudioTrainning.aggregate([
      { $match: { label: 'train' } },
      { $sample: { size: Math.floor(countAudioTraining * 0.2) } },
    ]);
    console.log('Get random 20% train audio successful');

    await Promise.all(
      randomAudios.map(async randomAudio => {
        await AudioTrainning.findByIdAndUpdate(randomAudio._id, {
          label: '',
        });
      }),
    );
    console.log('Assign it to unlabel successful');
  } catch (error) {
    console.log(error);
  }

  process.exit();
})();
