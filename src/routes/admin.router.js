const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  addUser,
  createTest,
  uploadSentence,
  uploadAudio,
} = require('../controllers/admin.controller');

router.post('/add-user', auth, asyncWrap(addUser));
router.post('/create-test', auth, asyncWrap(createTest));
router.post('/upload-sentence', auth, asyncWrap(uploadSentence));
router.post('/upload-audio', auth, asyncWrap(uploadAudio));

module.exports = router;
