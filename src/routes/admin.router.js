const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  getListUser,
  addUser,
  createTest,
  uploadSentence,
  uploadAudio,
  addUserChosenAndFileUpload,
} = require('../controllers/admin.controller');

router.get('/users', auth, asyncWrap(getListUser));
router.post('/add-user', auth, asyncWrap(addUser));
router.post('/create-test', auth, asyncWrap(createTest));
router.post('/upload-sentence', auth, asyncWrap(uploadSentence));
router.post('/upload-audio', auth, asyncWrap(uploadAudio));
router.put('/add-user-fileupload', auth, asyncWrap(addUserChosenAndFileUpload));

module.exports = router;
