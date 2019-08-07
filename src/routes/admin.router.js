const express = require('express');

const router = express.Router();
const asyncWrap = require('../middlewares/asyncWrap');
const auth = require('../middlewares/auth');
const { addUser } = require('../controllers/admin.controller');

router.post('/add-user', auth, asyncWrap(addUser));

module.exports = router;
