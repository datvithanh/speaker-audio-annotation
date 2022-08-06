require('../src/db/mongoose');

const User = require('../src/models/user.model');
const Voice = require('../src/models/voice.model');

const emails = ["datvithan@gmail.com"];

(async () => {
  for await (const email of emails) {
    User.create({
      role: 2,
      email: email,
      name: email.split('@')[0],
      password: '12345678'
    });
  }
})();