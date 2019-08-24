const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const {
  signup,
  signin,
  getInfoUser,
  logout,
  getPublicTest,
  getPrivateTestOfUser,
  getAudioByUser,
  setPointForAudio,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));
router.post('/logout', auth, asyncWrap(logout));
router.get('/', auth, asyncWrap(getInfoUser));
router.get('/public-tests', auth, asyncWrap(getPublicTest));
router.get('/private-tests/:user', auth, asyncWrap(getPrivateTestOfUser));
router.get('/get-audio', auth, asyncWrap(getAudioByUser));
router.put('/set-point', auth, asyncWrap(setPointForAudio));

module.exports = router;
