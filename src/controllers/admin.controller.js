const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const User = require('../models/user.model');
const Test = require('../models/test.model');

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
  await Test.create(req.body);
  res.send({
    status: 1,
  });
}

async function uploadAudio(req, res) {
  const { file } = req;
  if (file.size > LIMIT_FILE_ZIP) {
    throw new CustomError(errorCode.BAD_REQUEST, 'File too large');
  }
  if (!file.originalname.match(/\.(zip)$/)) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Please upload a zip file!');
  }

  res.send();
}

module.exports = {
  addUser,
  createTest,
  uploadAudio,
};
