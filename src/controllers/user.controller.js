const bcrypt = require('bcryptjs');
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
    throw new CustomError(errorCode.UNAUTHORIZED, 'Login failed');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError(errorCode.UNAUTHORIZED);
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
    users: req.params.user,
    accessModifier: 'Private',
  });
  res.send({
    status: 1,
    results: {
      tests,
    },
  });
}

async function getAudioByUser(req, res) {
  const { user, test } = req.query;

  const audios = await Audio.find({
    'users.userId': user,
    test,
  });

  const audiosDisplayForUser = await Promise.all(
    audios.map(async ({ _id, link, voice, sentence }) => {
      const contentSentence = await Sentence.findOne({
        _id: sentence,
      });

      const voiceName = await Voice.findOne({ _id: voice });

      return {
        _id,
        link,
        voice: voiceName.name,
        sentence: contentSentence.content,
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
  const { audioId, point, userId } = req.body;
  const audio = await Audio.findById(audioId);

  audio.users.forEach(user => {
    if (user.userId.toString() === userId) {
      user.point = point;
    }
  });

  audio.numberOfReviews += 1;

  audio.averagePoint =
    (audio.averagePoint * (audio.numberOfReviews - 1) + point) /
    audio.numberOfReviews;

  await audio.save();

  res.send({
    status: 1,
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
};
