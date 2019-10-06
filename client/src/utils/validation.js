export function isValidEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

export function isValidYear(year) {
  return /^(19[5-9]\d|20[0-4]\d|2050)$/.test(year);
}

export function isValidNumbersOfLiveYear(numbersOfLiveYear) {
  return numbersOfLiveYear && /^\d*\.?\d*$/.test(numbersOfLiveYear);
}

export function isStrongPassword(password) {
  const regex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
  return regex.test(password);
}
