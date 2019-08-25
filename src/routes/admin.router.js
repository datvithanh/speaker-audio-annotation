const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  getListUser,
  addVoice,
  addUser,
  createTest,
  uploadSentence,
  uploadAudio,
  addUserChosenAndFileUpload,
  getListTest,
  getTestById,
  getAudiosByTestAndVoice,
} = require('../controllers/admin.controller');

router.get('/users', auth, asyncWrap(getListUser));
router.post('/add-user', auth, asyncWrap(addUser));
router.post('/create-test', auth, asyncWrap(createTest));
router.post('/upload-sentence', auth, asyncWrap(uploadSentence));
router.post('/upload-audio', auth, asyncWrap(uploadAudio));
router.put('/add-user-fileupload', auth, asyncWrap(addUserChosenAndFileUpload));
router.post('/add-voice', auth, asyncWrap(addVoice));
router.get('/tests', auth, asyncWrap(getListTest));
router.get('/tests/:id', auth, asyncWrap(getTestById));
router.get('/get-audio', auth, asyncWrap(getAudiosByTestAndVoice));

module.exports = router;
