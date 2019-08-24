/* eslint-disable no-plusplus */
const Audio = require('../models/audio.model');

const shuffle = async array => {
  let currentIndex = array.length; // 4
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex); // 0 -> 3
    currentIndex -= 1; // currentIndex = 3

    // And swap it with the current element.
    temporaryValue = array[currentIndex]; // hoan vi arr[3] arr[3]
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const randomAudioForUser = async (voice, test) => {
  try {
    const { minSentences, minPeopleListenAudio, minPeopleJoin, users } = test;
    const audioRandom = Array(minSentences)
      .fill(null)
      .map(() => []);
    for (let i = 0; i <= minSentences - 1; i++) {
      const randomUsers = await shuffle(users);
      // console.log(randomUsers);
      const audios = await Audio.find({ test: test._id, voice });
      for (let j = 0; j <= minPeopleJoin / minPeopleListenAudio - 1; j++) {
        audioRandom[i][j] = randomUsers.slice(
          j * minPeopleListenAudio,
          j * minPeopleListenAudio + minPeopleListenAudio,
        );

        // i = 0, j = {0, 1} => A[0], A[1]
        // i = 1, j= {0, 1} => A[2], A[3]
        // i = 2, j = {0, 1} => A[4], A[5]
        const random = audioRandom[i][j];
        // console.log('random', random);

        await Audio.findByIdAndUpdate(
          audios[j + (minPeopleJoin / minPeopleListenAudio) * i]._id,
          {
            users: random.map(item => ({ userId: item, point: null })),
            averagePoint: null,
          },
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = randomAudioForUser;
