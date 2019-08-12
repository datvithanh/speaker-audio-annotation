const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  addUser,
  createTest,
  uploadSentence,
} = require('../controllers/admin.controller');

router.post('/add-user', auth, asyncWrap(addUser));
router.post('/create-test', auth, asyncWrap(createTest));
router.post('/upload-sentence', auth, asyncWrap(uploadSentence));

module.exports = router;
