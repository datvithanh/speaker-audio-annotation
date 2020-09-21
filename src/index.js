/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
require('./db/mongoose');
const bodyParse = require('body-parser');
const path = require('path');

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHanlder');

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(fileUpload({ parseNested: true }));
app.use('/api/users', require('./routes/user.router'));
app.use('/api/admin', require('./routes/admin.router'));
app.use('/api/teams', require('./routes/team.route'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
