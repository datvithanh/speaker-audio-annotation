function getErrorMessage(code) {
  switch (code) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 429:
      return 'Too Many Requests';
    case 1:
      return 'Email already exist';
    case 2:
      return 'File too large';
    case 3:
      return 'Can not create file';
    default:
      return null;
  }
}

module.exports = getErrorMessage;
