const mongoose = require('mongoose');
const CustomError = require('../errors/CustomError');
const errorCode = require('../errors/errorCode');
const TeamInCompetition = require('../models/teamInCompetition.model');
const Competition = require('../models/competition.model');
const AudioTrainning = require('../models/audioTrainning.model');

async function getListCompetition(req, res) {
  const teamInCompetiton = await TeamInCompetition.find({
    teamId: req.user._id,
    status: true,
  })
    .populate('competitionId')
    .lean();

  const competitions = teamInCompetiton.map(team => ({
    ...team.competitionId,
    numberOfCompletedAudio: team.numberOfCompletedAudio,
  }));

  res.send({
    status: 1,
    results: { competitions },
  });
}

async function joinCompetition(req, res) {
  const { competitionId } = req.body;
  if (!competitionId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }

  const joined = await TeamInCompetition.findOne({
    competitionId,
    teamId: req.user._id,
  });

  if (joined) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You have joined competition!',
    );
  }

  await TeamInCompetition.create({ competitionId, teamId: req.user._id });
  const competition = await Competition.findById(competitionId);
  res.send({
    status: 1,
    results: {
      competitionId: competition.id,
      competitionName: competition.name,
    },
  });
}

async function randomizeAudio(req, res) {
  const { competitionId } = req.params;
  if (!competitionId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing competitionId');
  }

  const competition = await Competition.findById(competitionId);
  if (!competition) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Competition does not exist!');
  }

  const audios = await AudioTrainning.find({
    competitionId,
    numberOfEditors: { $lt: competition.rules.numberOfListenersPerAudio },
    editors: { $nin: [req.user._id] },
  }).sort({
    numberOfEditors: 'asc',
  });

  res.send({
    status: 1,
    results: {
      audio: audios[0],
    },
  });
}

async function getListTranscipt(req, res) {
  const { audioId } = req.params;
  if (!audioId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing audioId');
  }
  const audio = await AudioTrainning.findById(audioId);

  res.send({
    status: 1,
    results: {
      transcripts: audio.transcripts,
    },
  });
}

async function typing(req, res) {
  const { text, audioId } = req.body;
  if (!audioId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing audioId');
  }
  if (!text) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing text');
  }
  if (typeof text !== 'string') {
    throw new CustomError(errorCode.BAD_REQUEST, 'Text must be a string!');
  }

  const audio = await AudioTrainning.findById(audioId);

  const isTeamInCompetition = await TeamInCompetition.findOne({
    teamId: req.user._id,
    competitionId: audio.competitionId,
  });

  if (!isTeamInCompetition) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You have not joined the competition',
    );
  }

  if (audio.editors.includes(req.user._id)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You have completed for this audio',
    );
  }

  const checkSameText = audio.transcripts.find(
    transcript => transcript.content === text,
  );

  if (checkSameText) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'Dupicate text content to anyone',
    );
  }
  const audioUpdated = await AudioTrainning.findByIdAndUpdate(
    audioId,
    {
      $push: {
        transcripts: { teamId: req.user._id, content: text },
        editors: req.user._id,
      },
      $inc: { numberOfEditors: 1 },
    },
    { new: true },
  );

  await TeamInCompetition.findOneAndUpdate(
    {
      teamId: req.user._id,
      competitionId: audioUpdated.competitionId,
    },
    {
      $inc: { numberOfCompletedAudio: 1 },
    },
  );

  res.send({
    status: 1,
    results: {
      audio: audioUpdated,
    },
  });
}

async function voting(req, res) {
  const { teamId, audioId } = req.body;
  if (!audioId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing audioId');
  }
  if (!teamId) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Missing teamId');
  }

  const isAudioExist = await AudioTrainning.findOne({
    'transcripts.teamId': mongoose.Types.ObjectId(teamId),
    _id: audioId,
  });

  if (!isAudioExist) {
    throw new CustomError(errorCode.BAD_REQUEST, 'Audio does not exist!');
  }

  const audio = await AudioTrainning.findById(audioId);

  const isTeamInCompetition = await TeamInCompetition.findOne({
    teamId: req.user._id,
    competitionId: audio.competitionId,
  });

  if (audio.editors.includes(req.user._id)) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You have completed for this audio',
    );
  }

  if (!isTeamInCompetition) {
    throw new CustomError(
      errorCode.BAD_REQUEST,
      'You have not joined the competition',
    );
  }

  const audioUpdated = await AudioTrainning.findOneAndUpdate(
    { 'transcripts.teamId': mongoose.Types.ObjectId(teamId), _id: audioId },
    {
      $inc: { 'transcripts.$.numberOfVotes': 1, numberOfEditors: 1 },
      $push: { editors: req.user._id },
    },
    { new: true },
  );

  await TeamInCompetition.findOneAndUpdate(
    {
      teamId: req.user._id,
      competitionId: audioUpdated.competitionId,
    },
    {
      $inc: { numberOfCompletedAudio: 1 },
    },
  );

  res.send({
    status: 1,
    results: {
      audio: audioUpdated,
    },
  });
}

module.exports = {
  getListCompetition,
  joinCompetition,
  randomizeAudio,
  getListTranscipt,
  voting,
  typing,
};