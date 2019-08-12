/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHanlder');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(fileUpload({ parseNested: true }));
app.use('/api/users', require('./routes/user.router'));
app.use('/api/admin/', require('./routes/admin.router'));

app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`Server is running on ${port}`);
});
