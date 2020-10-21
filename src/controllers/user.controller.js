const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');
const Audio = require('../models/audio.model');
const Sentence = require('../models/sentence.model');
const Voice = require('../models/voice.model');

async function signup(req, res) {
  const isExistMail = await User.findOne({ email: req.body.email });
  if (isExistMail) {
    throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, 'Email already exist');
  }

  const user = await User.create(req.body);
  const token = await user.generateAuthToken();

  res.send({
    status: 1,
    results: {
      token,
    },
  });
}

async function signin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Đăng nhập thất bại');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Đăng nhập thất bại');
  }

  const token = await user.generateAuthToken();
  res.send({
    status: 1,
    results: {
      token,
    },
  });
}

async function getInfoUser(req, res) {
  res.send({
    status: 1,
    results: {
      user: req.user,
    },
  });
}

async function logout(req, res) {
  req.user.tokens = req.user.tokens.filter(({ token }) => token !== req.token);
  await req.user.save();
  res.send({ status: 1 });
}

async function logoutAllDevice(req, res) {
  req.user.tokens = [];
  await req.user.save();
  res.send({ status: 1 });
}

async function getPublicTest(req, res) {
  const tests = await Test.find({ accessModifier: 'Public' });
  res.send({
    status: 1,
    results: {
      tests,
    },
  });
}

async function getPrivateTestOfUser(req, res) {
  const tests = await Test.find({
    'users.id': req.params.user,
    accessModifier: 'Private',
  });
  res.send({
    status: 1,
    results: {
      tests,
    },
  });
}

const shuffle = array => {
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

async function getAudioByUser(req, res) {
  const { user, test } = req.query;

  const audios = await Audio.find({
    'users.userId': user,
    test,
  });

  let shuffleAudios = [];
  const testObj = await Test.findOne({ _id: test });
  const theUser = testObj.users.find(u => u.id.toString() === user);
  shuffleAudios = theUser ? theUser.audios : [];

  if (!shuffleAudios.length) {
    shuffleAudios = shuffle(audios.map(audio => audio._id));
    theUser.audios = shuffleAudios;
    await testObj.save();
  }

  const audiosDisplayForUser = await Promise.all(
    shuffleAudios.map(async audioId => {
      const audio = await Audio.findById(audioId);
      const { _id, link, voice, sentence, users } = audio;

      const contentSentence = await Sentence.findOne({
        _id: sentence,
      });

      const voiceName = await Voice.findOne({ _id: voice });
      const userSpec = users.find(item => item.userId.toString() === user);

      return {
        _id,
        link,
        voice: voiceName.name,
        sentence: contentSentence.content,
        user: userSpec,
      };
    }),
  );

  res.send({
    status: 1,
    results: {
      audios: audiosDisplayForUser,
    },
  });
}

async function setPointForAudio(req, res) {
  const { testId, audioId, point, userId, indexAudio } = req.body;
  const test = await Test.findOne({ _id: testId });

  const userUpdateIndexAudio = test.users.find(
    user => user.id.toString() === userId,
  );

  if (indexAudio === userUpdateIndexAudio.indexAudio) {
    userUpdateIndexAudio.indexAudio += 1;
  } else {
    userUpdateIndexAudio.indexAudio = indexAudio + 1;
  }

  await test.save();
  const audio = await Audio.findById(audioId);

  audio.users.forEach(user => {
    if (user.userId.toString() === userId) {
      if (!user.point && point) {
        audio.numberOfReviews += 1;
        audio.averagePoint =
          (audio.averagePoint * (audio.numberOfReviews - 1) + point) /
          audio.numberOfReviews;
      } else {
        audio.averagePoint =
          (audio.averagePoint * audio.numberOfReviews - user.point + point) /
          audio.numberOfReviews;
      }
      user.point = point;
      user.lastUpdate = Date.now();
    }
  });

  await audio.save();

  res.send({
    status: 1,
    results: {
      indexAudio: userUpdateIndexAudio.indexAudio,
    },
  });
}

async function setMaxIndexAudio(req, res) {
  const { testId, userId } = req.body;
  const test = await Test.findOne({ _id: testId });

  const userUpdateIndexAudio = test.users.find(
    user => user.id.toString() === userId,
  );
  userUpdateIndexAudio.indexAudio = test.minSentences * test.voices.length + 1;
  await test.save();
  res.send({
    status: 1,
    results: {
      indexAudio: userUpdateIndexAudio.indexAudio,
    },
  });
}

async function updateRealUserForAudio(req, res) {
  const { userId, testId } = req.body;

  const test = await Test.findById(testId);

  const systemUser = test.systemUsers[0];

  const audios = await Audio.find({
    'users.userId': systemUser,
    test: testId,
  }).lean();

  if (!test.users.map(user => user.id).includes(userId)) {
    // throw new CustomError(errorCode.BAD_REQUEST, 'Ban da join bai test');
    await Promise.all(
      audios.map(async audio => {
        let { users } = audio;
        users = users.map(user => {
          if (user.userId.equals(systemUser)) {
            return { ...user, userId: ObjectId(userId) };
          }

          return user;
        });
        await Audio.findByIdAndUpdate(audio._id, { users });
      }),
    );
    test.systemUsers.shift();

    await User.deleteOne({ _id: systemUser });
    test.users.push({ id: userId, indexAudio: 0 });
    await test.save();
    res.send({
      status: 1,
      results: { test },
    });
  }
}

async function getIndexAudio(req, res) {
  const { testId, userId } = req.query;
  const test = await Test.findOne({ _id: testId });

  const userUpdateIndexAudio = test.users.find(
    user => user.id.toString() === userId,
  );

  res.send({
    status: 1,
    results: {
      indexAudio: userUpdateIndexAudio.indexAudio,
    },
  });
}

async function changePassword(req, res) {
  const { userId, password, newPassword } = req.body;
  const user = await User.findById(userId);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Mật khẩu không đúng');
  }

  user.password = newPassword;
  user.actived = true;
  await user.save();

  res.send({
    status: 1,
  });
}

async function getTestById(req, res) {
  const test = await Test.findById(req.params.id);

  res.send({
    status: 1,
    results: {
      test,
    },
  });
}

module.exports = {
  signup,
  signin,
  getInfoUser,
  logout,
  logoutAllDevice,
  getPublicTest,
  getPrivateTestOfUser,
  getAudioByUser,
  setPointForAudio,
  updateRealUserForAudio,
  getIndexAudio,
  changePassword,
  setMaxIndexAudio,
  getTestById,
};
