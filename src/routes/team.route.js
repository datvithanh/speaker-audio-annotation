const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');

const {
  joinCompetition,
  randomizeAudio,
  getListTranscipt,
  typing,
  voting,
  getListCompetition,
  getCompetitionById,
  getTaskProcess,
} = require('../controllers/team.controller');

router.get('/get-list-competition', auth, asyncWrap(getListCompetition));
router.post('/join-competiton', auth, asyncWrap(joinCompetition));
router.get('/randomize-audio/:competitionId', auth, asyncWrap(randomizeAudio));
router.get('/get-list-transcript/:audioId', auth, asyncWrap(getListTranscipt));
router.patch('/typing', auth, asyncWrap(typing));
router.patch('/voting', auth, asyncWrap(voting));
router.get(
  '/get-competition/:competitionId',
  auth,
  asyncWrap(getCompetitionById),
);

router.get('/get-task-process/:competitionId', auth, asyncWrap(getTaskProcess));

module.exports = router;
