/* eslint-disable no-console */
const fs = require('fs');
const decompress = require('decompress');
const uuid = require('uuid');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');
const Sentence = require('../models/sentence.model');
const Audio = require('../models/audio.model');
const { SRC_PATH } = require('../constant');

async function addUser(req, res) {
  const isExistMail = await User.findOne({ email: req.body.email });
  if (isExistMail) {
    throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, 'Email đã tồn tại');
  }

  await User.create(req.body);

  res.send({
    status: 1,
  });
}

async function createTest(req, res) {
  const test = await Test.create(req.body);
  res.send({
    status: 1,
    results: {
      test,
    },
  });
}

async function uploadSentence(req, res) {
  const test = JSON.parse(req.body.test);

  const { sentence } = req.files;

  if (!sentence.name.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Làm ơn upload file ZIP');
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = uuid.v4();
  const directoryPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;

  // create folder to contain file zip
  fs.mkdirSync(directoryPath, { recursive: true });

  const fileName = sentence.name;
  const filePath = `${directoryPath}/${fileName}`;

  // upload file zip
  const errUpload = await sentence.mv(filePath);

  if (errUpload) {
    console.log(errUpload);
  }

  await decompress(filePath, directoryPath);

  fs.readdirSync(directoryPath).forEach(fileUnzip => {
    if (!fileUnzip.match(/\.(zip)$/) && !fileUnzip.match(/\.(txt)$/)) {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'Bạn cần upload file zip chỉ có text bên trong',
      );
    }
  });

  fs.readdirSync(directoryPath).forEach(async fileUnzip => {
    const nameFileUnzip = fileUnzip.split('.')[0];
    if (fileUnzip.match(/\.(txt)$/)) {
      const content = fs.readFileSync(`${directoryPath}/${fileUnzip}`, 'utf8');
      await Sentence.create({
        _id: `${test._id}_${nameFileUnzip}`,
        content,
        test: test._id,
      });
    }
  });

  res.send({
    status: 1,
  });
}

async function uploadAudio(req, res) {
  const test = JSON.parse(req.body.test);

  const { audio } = req.files;

  if (!audio.name.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Làm ơn upload file ZIP');
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = uuid.v4();
  const directoryPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;

  // create folder to contain file zip
  fs.mkdirSync(directoryPath, { recursive: true });

  const fileName = audio.name;
  const filePath = `${directoryPath}/${fileName}`;

  // upload file zip
  const errUpload = await audio.mv(filePath);

  if (errUpload) {
    console.log(errUpload);
  }

  await decompress(filePath, directoryPath);

  fs.readdirSync(directoryPath).forEach(fileUnzip => {
    if (!fileUnzip.match(/\.(zip)$/) && !fileUnzip.match(/\.(wav)$/)) {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'Bạn cần upload file zip chỉ có file .wav bên trong',
      );
    }
    if (fileUnzip.split('.')[0].split('-').length !== 2) {
      throw new CustomError(
        errorCode.BAD_REQUEST,
        'Tồn tại file sai định dạng. Hãy nhập đúng định dạng Mã_câu-Mã_voice.wav',
      );
    }
  });

  fs.readdirSync(directoryPath).forEach(async fileUnzip => {
    if (fileUnzip.match(/\.(wav)$/)) {
      const sentence = `${test._id}-${fileUnzip.split('.')[0].split('-')[0]}`;
      const voice = fileUnzip.split('.')[0].split('-')[1];
      await Audio.create({
        link: `${directoryPath}/${fileUnzip}`,
        voice,
        sentence,
        test: test._id,
      });
    }
  });

  // Audio.aggregate(
  //   [
  //     {
  //       $group: {
  //         _id: '$voice',
  //         total: { $sum: 1 },
  //       },
  //     },
  //   ],
  //   (err, res) => {
  //     console.log(res);
  //   },
  // );

  res.send({
    status: 1,
  });
}

module.exports = {
  addUser,
  createTest,
  uploadSentence,
  uploadAudio,
};
