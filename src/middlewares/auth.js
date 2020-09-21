require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

async function auth(req, res, next) {
  try {
    let role = null;
    switch (req.originalUrl.split('/')[2]) {
      case 'admin':
        role = 1;
        break;
      case 'users':
        role = 0;
        break;
      case 'teams':
        role = 2;
        break;
      default:
        role = null;
    }
    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, 'tokens.token': token });

    if (
      !user ||
      (role !== user.role &&
        !(req.method === 'GET' && req.originalUrl === '/api/users') &&
        !(req.method === 'POST' && req.originalUrl === '/api/users/logout') &&
        !(
          req.method === 'PUT' &&
          req.originalUrl === '/api/users/change-password'
        ))
    ) {
      throw new Error('Unabled authenticate');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
}

module.exports = auth;
