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
  updateRealUserForAudio,
  getIndexAudio,
  changePassword,
  setMaxIndexAudio,
} = require('../controllers/user.controller');

router.post('/signup', asyncWrap(signup));
router.post('/signin', asyncWrap(signin));
router.post('/logout', auth, asyncWrap(logout));
router.get('/', auth, asyncWrap(getInfoUser));
router.get('/public-tests', auth, asyncWrap(getPublicTest));
router.get('/private-tests/:user', auth, asyncWrap(getPrivateTestOfUser));
router.get('/get-audio', auth, asyncWrap(getAudioByUser));
router.put('/set-point', auth, asyncWrap(setPointForAudio));
router.put('/update-real-user', auth, asyncWrap(updateRealUserForAudio));
router.get('/get-index-audio', auth, asyncWrap(getIndexAudio));
router.put('/change-password', auth, asyncWrap(changePassword));
router.put('/set-max-index-audio', auth, asyncWrap(setMaxIndexAudio));

module.exports = router;
