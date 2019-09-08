/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const fs = require('fs');
const fsExtra = require('fs-extra');
const { ObjectId } = require('mongoose').Types;
const decompress = require('decompress');
const uuid = require('uuid');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');
const Sentence = require('../models/sentence.model');
const Audio = require('../models/audio.model');
const Voice = require('../models/voice.model');
const { SRC_PATH } = require('../constant');
const randomAudioForUser = require('../service/randomAudioForUser');

async function getListUser(req, res) {
  const users = await User.find({});
  res.send({
    status: 1,
    results: {
      users,
    },
  });
}

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
  const {
    name,
    minPeopleListenAudio,
    numberOfSentences,
    minSentences,
    voices,
  } = req.body;

  const checkNameTestExist = await Test.findOne({ name });
  if (checkNameTestExist) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Trùng tên bài test đã có trong hệ thống. Vui lòng nhập tên khác!',
    );
  }

  const voiceSystem = await Voice.find({});
  const voiceSystemArrayName = voiceSystem.map(item => item.name);

  // const isValidOperation = updates.every(update =>
  //   allowedUpdates.includes(update),
  // );

  // const found = arr1.some(r => arr2.includes(r));

  const checkVoice = voices.every(item => voiceSystemArrayName.includes(item));

  if (!checkVoice) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn đã nhập giọng không có trong hệ thông. Vui lòng xem lại!',
    );
  }

  const voicesConvertToCode = [];

  for (let i = 0; i < voices.length; i++) {
    const voiceCurrently = await Voice.findOne({ name: voices[i] });
    voicesConvertToCode.push(voiceCurrently._id);
  }

  const minPeopleJoin =
    (minPeopleListenAudio * numberOfSentences) / minSentences;
  const test = await Test.create({
    ...req.body,
    minPeopleJoin,
    voices: voicesConvertToCode,
  });
  res.send({
    status: 1,
    results: {
      test,
    },
  });
}

async function uploadSentence(req, res) {
  const { sentence } = req.files;

  if (!sentence.name.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Làm ơn upload file ZIP');
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = uuid.v4();
  const directoryPath = `/${year}/${month}/${day}/${random}`;
  const directoryFullPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;

  // create folder to contain file zip
  fs.mkdirSync(directoryFullPath, { recursive: true });

  const fileName = sentence.name;
  const filePath = `${directoryFullPath}/${fileName}`;

  // upload file zip
  const errUpload = await sentence.mv(filePath);

  if (errUpload) {
    console.log(errUpload);
  }

  await decompress(filePath, directoryFullPath);

  let isValidInput = true;
  await Promise.all(
    fs.readdirSync(directoryFullPath).map(async fileUnzip => {
      if (!fileUnzip.match(/\.(zip)$/) && !fileUnzip.match(/\.(txt)$/)) {
        isValidInput = false;
      }
    }),
  );

  if (!isValidInput) {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn cần upload file zip chỉ có text bên trong',
    );
  }

  res.send({
    status: 1,
    results: {
      directoryPath,
    },
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
  const directoryPath = `/${year}/${month}/${day}/${random}`;
  const directoryFullPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;

  // create folder to contain file zip
  fs.mkdirSync(directoryFullPath, { recursive: true });

  const fileName = audio.name;
  const filePath = `${directoryFullPath}/${fileName}`;

  // upload file zip
  const errUpload = await audio.mv(filePath);

  if (errUpload) {
    console.log(errUpload);
  }

  await decompress(filePath, directoryFullPath);

  let errorInput = null;
  let numberOfSentencesUpload = 0;
  let numberOfAudiosUpload = 0;
  await Promise.all(
    fs.readdirSync(directoryFullPath).map(async fileUnzip => {
      if (
        !fileUnzip.match(/\.(zip)$/) &&
        !fileUnzip.match(/\.(wav)$/) &&
        !fileUnzip.match(/\.(txt)$/)
      ) {
        errorInput = 'error-ext';
      } else if (
        !fileUnzip.match(/\.(zip)$/) &&
        fileUnzip.match(/\.(wav)$/) &&
        fileUnzip.split('.')[0].split('-').length !== 2
      ) {
        errorInput = 'error-format';
      } else if (fileUnzip.match(/\.(txt)$/)) {
        numberOfSentencesUpload += 1;
      } else if (fileUnzip.match(/\.(wav)$/)) {
        numberOfAudiosUpload += 1;
      }
    }),
  );

  if (errorInput === 'error-ext') {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Bạn cần upload file zip chỉ có file .wav hooặc file text bên trong',
    );
  }

  if (errorInput === 'error-format') {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Tồn tại file sai định dạng. Bạn cần upload file đúng định dạng Mã_câu-Mã_voice.wav',
    );
  }

  if (numberOfSentencesUpload !== test.numberOfSentences) {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      `Bạn phải upload đúng ${test.numberOfSentences} câu`,
    );
  }

  if (numberOfAudiosUpload !== test.numberOfSentences * test.voices.length) {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      `Bạn phải upload đúng ${test.numberOfSentences *
        test.voices.length} audio`,
    );
  }

  await Promise.all(
    fs.readdirSync(directoryFullPath).map(async fileUnzip => {
      if (fileUnzip.match(/\.(wav)$/)) {
        const sentence = `${test._id}-${fileUnzip.split('.')[0].split('-')[0]}`;
        const voice = fileUnzip.split('.')[0].split('-')[1];
        await Audio.create({
          link: `${directoryFullPath}/${fileUnzip}`,
          voice,
          sentence,
          test: test._id,
        });
      }
    }),
  );

  const results = await Audio.aggregate([
    { $match: { test: ObjectId(test._id) } },
    {
      $group: {
        _id: '$sentence',
        total: { $sum: 1 },
      },
    },
  ]);

  results.forEach(result => {
    if (result.total !== test.voices.length) {
      errorInput = 'error-quantity';
    }
  });

  if (errorInput === 'error-quantity') {
    fsExtra.removeSync(directoryFullPath);
    await Audio.deleteMany({ test: ObjectId(test._id) });
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Kiểm tra lại file upload: Số giọng trong file khác số giọng của bài test hoặc số giọng mỗi câu không bằng nhau',
    );
  }

  await Audio.deleteMany({ test: ObjectId(test._id) });

  res.send({
    status: 1,
    results: {
      directoryPath,
    },
  });
}

async function addUserChosenAndFileUpload(req, res) {
  const { audioPath, users, test } = req.body;

  fs.readdirSync(`${SRC_PATH}/static/${audioPath}`).forEach(async fileUnzip => {
    const nameFileUnzip = fileUnzip.split('.')[0];
    if (fileUnzip.match(/\.(txt)$/)) {
      const content = fs.readFileSync(
        `${SRC_PATH}/static/${audioPath}/${fileUnzip}`,
        'utf8',
      );
      await Sentence.create({
        _id: `${test}_${nameFileUnzip}`,
        content,
        test,
      });
    }
    if (fileUnzip.match(/\.(wav)$/)) {
      const sentence = `${test}_${fileUnzip.split('.')[0].split('-')[0]}`;
      const voice = fileUnzip.split('.')[0].split('-')[1];
      await Audio.create({
        link: `${audioPath}/${fileUnzip}`,
        voice,
        sentence,
        test,
      });
    }
  });

  // fs.readdirSync(`${SRC_PATH}/static/${audioPath}`).forEach(async fileUnzip => {
  //   if (fileUnzip.match(/\.(wav)$/)) {
  //     const sentence = `${test}_${fileUnzip.split('.')[0].split('-')[0]}`;
  //     const voice = fileUnzip.split('.')[0].split('-')[1];
  //     await Audio.create({
  //       link: `${audioPath}/${fileUnzip}`,
  //       voice,
  //       sentence,
  //       test,
  //     });
  //   }
  // });

  const testCurrently = await Test.findById(test);

  if (users.length !== 0) {
    testCurrently.users = users.map(user => ({ id: user, indexAudio: 0 }));
  } else {
    for (let i = 0; i < testCurrently.minPeopleJoin; i++) {
      const user = await User.create({ type: 1 });
      testCurrently.systemUsers.push(user);
    }
  }

  await testCurrently.save();

  for (const voice of testCurrently.voices) {
    await randomAudioForUser(voice, testCurrently);
  }

  res.send({
    status: 1,
    results: {
      test: testCurrently,
    },
  });
}

async function getListTest(req, res) {
  const tests = await Test.find({});
  res.send({
    status: 1,
    results: {
      tests,
    },
  });
}

async function getTestById(req, res) {
  const test = await Test.findById(req.params.id).lean();

  const voices = await Promise.all(
    test.voices.map(async voice => {
      const voiceName = await Voice.findOne({ _id: voice });
      return voiceName;
    }),
  );

  res.send({
    status: 1,
    results: {
      test: {
        ...test,
        voices,
      },
    },
  });
}

async function getAudiosByTestAndVoice(req, res) {
  const { test, voice } = req.query;

  const audios = await Audio.find({ test, voice }).lean();
  const voiceObj = await Voice.findOne({ _id: voice });
  const audiosConvert = await Promise.all(
    audios.map(async audio => {
      const sentenceObj = await Sentence.findOne({
        _id: audio.sentence,
      });

      let averagePointRound = null;
      if (audio.averagePoint) {
        averagePointRound = audio.averagePoint.toFixed(1);
      }

      const userConvert = await Promise.all(
        audio.users.map(async user => {
          const userObj = await User.findById(user.userId);
          return {
            ...user,
            email: userObj.email,
            name: userObj.name,
          };
        }),
      );
      return {
        ...audio,
        voice: voiceObj.name,
        sentence: sentenceObj.content,
        users: userConvert,
        averagePoint: averagePointRound,
      };
    }),
  );
  res.send({
    status: 1,
    results: {
      audios: audiosConvert,
    },
  });
}

async function getAllAudioByTestId(req, res) {
  const { testId } = req.params;
  const audios = await Audio.find({ test: testId }).lean();
  const audiosConvert = await Promise.all(
    audios.map(async audio => {
      const sentenceObj = await Sentence.findOne({
        _id: audio.sentence,
      });

      let averagePointRound = null;
      if (audio.averagePoint) {
        averagePointRound = audio.averagePoint.toFixed(1);
      }

      const userConvert = await Promise.all(
        audio.users.map(async user => {
          const userObj = await User.findById(user.userId);
          return {
            ...user,
            email: userObj.email,
            name: userObj.name,
          };
        }),
      );

      const voiceObj = await Voice.findOne({ _id: audio.voice });
      return {
        ...audio,
        voice: voiceObj.name,
        sentence: sentenceObj.content,
        users: userConvert,
        averagePoint: averagePointRound,
      };
    }),
  );
  res.send({
    status: 1,
    results: {
      audios: audiosConvert,
    },
  });
}

async function getVoices(req, res) {
  const voices = await Voice.find({});
  res.send({
    status: 1,
    results: {
      status: 1,
      voices,
    },
  });
}

async function addVoice(req, res) {
  const { voiceId, voiceName } = req.body;
  const existedVoice = await Voice.findById(voiceId);
  if (existedVoice) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Mã voice đã tồn tại');
  }
  const voice = await Voice.create({ _id: voiceId, name: voiceName });
  res.send({
    status: 1,
    results: {
      status: 1,
      voice,
    },
  });
}

async function deleteVoice(req, res) {
  const { voiceId } = req.params;
  await Voice.findOneAndDelete({ _id: voiceId });
  res.send({
    status: 1,
  });
}

module.exports = {
  getListUser,
  addUser,
  createTest,
  uploadSentence,
  uploadAudio,
  addUserChosenAndFileUpload,
  getListTest,
  getTestById,
  getAudiosByTestAndVoice,
  getAllAudioByTestId,
  getVoices,
  addVoice,
  deleteVoice,
};
