/* eslint-disable no-console */
const fs = require('fs');
const decompress = require('decompress');
const uuid = require('uuid');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');
const Sentence = require('../models/sentence.model');
const { SRC_PATH } = require('../constant');

const LIMIT_FILE_ZIP = 1000000;

async function addUser(req, res) {
  const isExistMail = await User.findOne({ email: req.body.email });
  if (isExistMail) {
    throw new CustomError(errorCode.EMAIL_ALREADY_EXIST, 'Email already exist');
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
  // console.log(req.body);
  const { sentence } = req.files;
  if (sentence === null) {
    throw new CustomError(errorCode.BAD_REQUEST, 'No file upload');
  }

  if (sentence.size > LIMIT_FILE_ZIP) {
    throw new CustomError(errorCode.BAD_REQUEST, 'File too large');
  }

  if (!sentence.name.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Please upload file ZIP');
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

  fs.readdirSync(directoryPath).forEach(async fileUnzip => {
    if (fileUnzip.match(/\.(txt)$/)) {
      const content = fs.readFileSync(`${directoryPath}/${fileUnzip}`, 'utf8');
      await Sentence.create({ content, test: JSON.parse(req.body.test)._id });
    }
  });

  // fs.readdir(directoryPath, (error, fileUnzips) => {
  //   if (error) throw error;
  //   fileUnzips.forEach(fileUnzip => {
  //     if (fileUnzip.match(/\.(txt)$/)) {
  //       const data = fs.readFileSync(`${directoryPath}/${fileUnzip}`, 'utf8');
  //       console.log(data);
  //     }
  //   });
  // });

  res.send({
    status: 1,
  });
}

module.exports = {
  addUser,
  createTest,
  uploadSentence,
};
