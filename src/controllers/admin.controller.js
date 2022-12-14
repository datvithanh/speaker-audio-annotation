/* eslint-disable no-restricted-globals */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const fs = require('fs');
const fsExtra = require('fs-extra');
const { ObjectId } = require('mongoose').Types;
const decompress = require('decompress');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const AdmZip = require('adm-zip');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');
const Sentence = require('../models/sentence.model');
const Audio = require('../models/audio.model');
const Voice = require('../models/voice.model');
const AudioTrainning = require('../models/audioTrainning.model');
const Competition = require('../models/competition.model');
const TeamInCompetition = require('../models/teamInCompetition.model');
const DataTrainExport = require('../models/dataTrainExport.model');
const Submission = require('../models/submission.model');
const { SRC_PATH } = require('../constant');
const randomAudioForUser = require('../service/randomAudioForUser');
// const { mkDirByPathSync } = require('../utils/file');

async function getListUser(req, res) {
  const users = await User.find({ role: 0 });
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
    // throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, 'Email đã tồn tại');
    const salt = await bcrypt.genSalt(10);
    await User.findOneAndUpdate(
      { email: req.body.email },
      {
        ...req.body,
        password: await bcrypt.hash(req.body.password, salt),
        actived: false,
      },
    );
  } else {
    await User.create({ ...req.body, actived: false });
  }

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

  const dateClosed = new Date(req.body.dateClosed);
  dateClosed.setDate(dateClosed.getDate() + 1);
  const test = await Test.create({
    ...req.body,
    minPeopleJoin,
    dateClosed,
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
  // mkDirByPathSync(directoryFullPath);
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
  // mkDirByPathSync(directoryFullPath);
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

// eslint-disable-next-line consistent-return
async function createTeam(req, res) {
  const { email, name, password } = req.body;
  const user = await User.findOne({ email: req.body.email });

  let team;

  if (user && user.actived) return res.send({ status: 0 });

  if (user) {
    const salt = await bcrypt.genSalt(10);
    team = await User.findByIdAndUpdate(user._id, {
      password: await bcrypt.hash(password, salt),
    });
  } else {
    team = await User.create({ email, name, password, role: 2 });
  }

  res.send({
    status: 1,
    results: {
      team,
    },
  });
}

async function createCompetition(req, res) {
  const {
    name,
    numberOfAudiosPerListener,
    numberOfMinVotersToAcceptAudio,
  } = req.body;
  const checkNameCompetitionExist = await Competition.findOne({ name });
  if (checkNameCompetitionExist) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Competition already existed!',
    );
  }

  const timeExpired = new Date(req.body.timeExpired);
  timeExpired.setDate(timeExpired.getDate() + 1);

  const competition = await Competition.create({
    name,
    rules: { numberOfAudiosPerListener, numberOfMinVotersToAcceptAudio },
    timeExpired,
  });

  res.send({
    status: 1,
    results: { competition },
  });
}

async function uploadTrainningData(req, res) {
  const { audio } = req.files;
  const { competitionName } = req.body;
  const competition = await Competition.findOne({ name: competitionName });

  if (!competition) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Competition does not exist');
  }

  if (!audio.name.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Please upload zip file');
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = uuid.v4();
  const directoryPath = `/${year}/${month}/${day}/${random}`;
  const directoryFullPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;
  // create folder to contain file zip
  // console.log({ directoryFullPath });
  // mkDirByPathSync(directoryFullPath);

  fs.mkdirSync(directoryFullPath, { recursive: true });
  const fileName = audio.name;
  const filePath = `${directoryFullPath}/${fileName}`;

  // upload file zip
  const errUpload = await audio.mv(filePath);

  if (errUpload) {
    console.log(errUpload);
  }

  await decompress(filePath, directoryFullPath);

  // remove __MACOSX directory
  fsExtra.removeSync(`${directoryFullPath}/__MACOSX`);

  let errorInput = null;

  await Promise.all(
    fs.readdirSync(directoryFullPath).map(async fileUnzip => {
      if (
        !fileUnzip.match(/\.(zip)$/) &&
        !fileUnzip.match(/\.(wav)$/) &&
        !fileUnzip.match(/\.(txt)$/)
      ) {
        errorInput = 'error-ext';
      }
    }),
  );

  if (errorInput === 'error-ext') {
    fsExtra.removeSync(directoryFullPath);
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You must upload zip file have only wav file or text file inside',
    );
  }

  let countAudio = 0;

  await Promise.all(
    fs.readdirSync(directoryFullPath).map(async fileUnzip => {
      if (fileUnzip.match(/\.(wav)$/)) {
        countAudio++;
        const textId = fileUnzip.split('.')[0].split('-')[0];
        let content = null;
        try {
          content = fs.readFileSync(
            `${directoryFullPath}/${textId}.txt`,
            'utf8',
          );
        } catch (e) {
          content = null;
        }

        const stats = fs.statSync(`${directoryFullPath}/${fileUnzip}`);
        console.log({ content });

        await AudioTrainning.create({
          competitionId: competition._id,
          link: `${directoryPath}/${fileUnzip}`,
          rawOriginContent: content,
          transcripts: content ? [{ numberOfVotes: 0, content }] : [],
          textLength: content ? content.length : 0,
          sizeInKilobytes: stats.size / 1000,
          label: '',
        });
      }
    }),
  );

  if (countAudio < competition.rules.numberOfAudiosPerListener) {
    await AudioTrainning.remove({ competitionId: competition._id });
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'The quantity of audio files less than the number of audio per listener of competition',
    );
  }
  res.send({
    status: 1,
    results: {
      directoryPath,
    },
  });
}

async function removeCompetition(req, res) {
  const { competitionId } = req.body;
  if (!competitionId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }
  const competition = await Competition.findByIdAndDelete(competitionId);
  await TeamInCompetition.deleteMany({ competitionId });
  await AudioTrainning.deleteMany({ competitionId });

  res.send({ status: 1, results: { competition } });
}

async function getListCompetition(req, res) {
  const competitions = await Competition.find({});

  res.send({ status: 1, results: { competitions } });
}

async function getAudiosByCompetitionId(req, res) {
  if (req.query.competitionId === 'undefined') {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }
  const { competitionId } = req.query;
  let { page = 1, limit = 10 } = req.query;
  page = Number.parseInt(page, 10);
  limit = Number.parseInt(limit, 10);

  const audios = await AudioTrainning.find({ competitionId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await AudioTrainning.countDocuments({ competitionId });

  res.send({
    status: 1,
    results: {
      audios,
      total: count,
      currentPage: page,
    },
  });
}

async function searchData(req, res) {
  const {
    textLengthFrom = 0,
    textLengthTo = 500,
    sizeFrom = 0,
    sizeTo = 5000,
    keyword = '',
    competitionId,
    label,
  } = req.query;

  let { page = 1, limit = 10 } = req.query;

  page = Number.parseInt(page, 10);
  limit = Number.parseInt(limit, 10);

  if (!competitionId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }

  if (
    isNaN(textLengthFrom) ||
    isNaN(textLengthTo) ||
    isNaN(sizeFrom) ||
    isNaN(sizeTo)
  ) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Parameter invalid 1');
  }

  if (textLengthFrom < 0 || textLengthTo < 0 || sizeFrom < 0 || sizeTo < 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Parameter invalid 2');
  }

  const audios = await AudioTrainning.find({
    competitionId,
    label: label !== 'all' ? label : { $in: ['train', 'test', ''] },
    textLength: { $gte: textLengthFrom, $lte: textLengthTo },
    sizeInKilobytes: { $gte: sizeFrom, $lte: sizeTo },
    rawOriginContent: { $regex: new RegExp(keyword), $options: 'i' },
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await AudioTrainning.countDocuments({
    competitionId,
    label: label !== 'all' ? label : { $in: ['train', 'test', ''] },
    textLength: { $gte: textLengthFrom, $lte: textLengthTo },
    sizeInKilobytes: { $gte: sizeFrom, $lte: sizeTo },
    rawOriginContent: { $regex: new RegExp(keyword), $options: 'i' },
  });

  if (page > Math.ceil(count / limit)) {
    page = 1;
  }

  res.send({
    status: 1,
    results: {
      audios,
      total: count,
      currentPage: page,
    },
  });
}

async function assignLabelForAudio(req, res) {
  const { audios, label } = req.body;
  const returnedAudios = await Promise.all(
    audios.map(async audio => {
      const au = await AudioTrainning.findByIdAndUpdate(
        audio,
        { label },
        { new: true },
      );
      return au;
    }),
  );

  res.send({ status: 1, results: { audios: returnedAudios } });
}

async function assignLabelForSearchedAudios(req, res) {
  const {
    textLengthFrom = 0,
    textLengthTo = 500,
    sizeFrom = 0,
    sizeTo = 5000,
    keyword = '',
    competitionId,
    label,
    labelAssigned,
  } = req.body;

  if (!competitionId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }

  if (
    isNaN(textLengthFrom) ||
    isNaN(textLengthTo) ||
    isNaN(sizeFrom) ||
    isNaN(sizeTo)
  ) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Parameter invalid 1');
  }

  if (textLengthFrom < 0 || textLengthTo < 0 || sizeFrom < 0 || sizeTo < 0) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Parameter invalid 2');
  }

  await AudioTrainning.updateMany(
    {
      competitionId,
      label: label !== 'all' ? label : { $in: ['train', 'test', ''] },
      textLength: { $gte: textLengthFrom, $lte: textLengthTo },
      sizeInKilobytes: { $gte: sizeFrom, $lte: sizeTo },
      rawOriginContent: { $regex: new RegExp(keyword), $options: 'i' },
    },
    { label: labelAssigned },
  );

  res.send({
    status: 1,
    // results: {
    //   audios,
    // },
  });
}

async function exportData(req, res) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = uuid.v4();
  const directoryPath = `/${year}/${month}/${day}/${random}`;
  const directoryFullPath = `${SRC_PATH}/static/${year}/${month}/${day}/${random}`;
  fs.mkdirSync(`${directoryFullPath}/data`, { recursive: true });

  const audioTrainnings = await AudioTrainning.find({ label: 'train' });

  if (audioTrainnings.length === 0) {
    throw new CustomError(errorCode.NOT_FOUND);
  }
  let textfilePath = null;
  let audiofilePath = null;
  audioTrainnings.forEach(audioTrainning => {
    const characterArray = audioTrainning.link.split('/');
    const prefixFileName = characterArray[characterArray.length - 1].split(
      '.',
    )[0];

    textfilePath = `${directoryFullPath}/data/${prefixFileName}.txt`;
    fs.writeFileSync(textfilePath, audioTrainning.rawOriginContent, err => {
      if (err) return console.log(err);

      return console.log('Ghi file thanh cong');
    });

    audiofilePath = `${directoryFullPath}/data/${prefixFileName}.wav`;

    fs.copyFileSync(
      `${SRC_PATH}/static${audioTrainning.link}`,
      audiofilePath,
      err => {
        if (err) throw err;
        console.log('copy successful');
      },
    );
  });

  // fs.mkdirSync(`${directoryFullPath}/data/test-data`, { recursive: true });
  // const audioTestings = await AudioTrainning.find({ label: 'test' });

  // audioTestings.forEach(audioTesting => {
  //   const characterArray = audioTesting.link.split('/');
  //   const prefixFileName = characterArray[characterArray.length - 1].split(
  //     '.',
  //   )[0];

  //   textfilePath = `${directoryFullPath}/data/test-data/${prefixFileName}.txt`;
  //   fs.writeFileSync(textfilePath, audioTesting.rawOriginContent, err => {
  //     if (err) return console.log(err);

  //     return console.log('Ghi file thanh cong');
  //   });
  // });

  const zip = new AdmZip();
  zip.addLocalFolder(`${directoryFullPath}/data`);
  zip.writeZip(`${directoryFullPath}/data.zip`);

  await DataTrainExport.create({
    fileName: 'data.zip',
    link: `${directoryPath}/data.zip`,
  });

  res.send({
    status: 1,
    results: { link: `${directoryPath}/data.zip` },
  });
}

async function createSubmission(req, res) {
  const { competitionId, timeExpired, name } = req.body;

  const competition = await Competition.findById(competitionId);

  const teamInCompetition = await TeamInCompetition.find({
    competitionId,
    numberOfCompletedAudio: {
      $gte: 300,
    },
  });

  const accessibleTeam = [];
  teamInCompetition.forEach(tic => {
    accessibleTeam.push(tic.teamId);
  });

  const submission = await Submission.create({
    competitionId,
    timeExpired,
    name,
    accessibleTeam,
  });

  res.send({
    status: 1,
    results: {
      submission,
    },
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
  createTeam,
  createCompetition,
  uploadTrainningData,
  removeCompetition,
  getListCompetition,
  exportData,
  searchData,
  assignLabelForAudio,
  getAudiosByCompetitionId,
  assignLabelForSearchedAudios,
  createSubmission,
};
