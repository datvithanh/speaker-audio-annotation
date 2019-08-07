const snakecaseKeys = require('snakecase-keys');
const errorCodes = require('../errors/errorCode');
const getErrorMessage = require('../errors/message');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let errorCode = err.code;
  let { message } = err;
  const code = err.code || errorCodes.INTERNAL_SERVER_ERROR;
  switch (code) {
    case errorCodes.BAD_REQUEST:
      message = message || 'Bad Request';
      break;
    case errorCodes.UNAUTHORIZED:
      message = 'Unauthorized';
      break;
    case errorCodes.FORBIDDEN:
      message = 'Forbidden';
      break;
    case errorCodes.NOT_FOUND:
      message = 'Not Found';
      break;
    case errorCodes.INTERNAL_SERVER_ERROR:
      errorCode = errorCodes.INTERNAL_SERVER_ERROR;
      message = message || 'Something went wrong';
      break;
    default:
      message = message || getErrorMessage(code);
      errorCode = 200;
  }
  return res.status(errorCode).send(
    snakecaseKeys(
      code
        ? {
            status: 0,
            code,
            message,
          }
        : {
            status: 0,
            message,
          },
    ),
  );
}

module.exports = errorHandler;
