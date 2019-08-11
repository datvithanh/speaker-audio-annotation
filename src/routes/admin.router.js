const express = require('express');

const router = express.Router();
const multer = require('multer');
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  addUser,
  createTest,
  uploadAudio,
} = require('../controllers/admin.controller');

const multerConfig = {
  storage: multer.diskStorage({
    destination(req, file, cb) {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      cb(null, `static/audios/${year}/${month}/${day}`);
    },
    filename(req, file, cb) {
      const ext = file.mimetype.split('/')[1];
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
  }),
};
router.post('/add-user', auth, asyncWrap(addUser));
router.post('/create-test', auth, asyncWrap(createTest));
router.post(
  '/upload-audio-zip',
  auth,
  multer(multerConfig).single('audio'),
  asyncWrap(uploadAudio),
);

module.exports = router;
