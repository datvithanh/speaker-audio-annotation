// remembering add process.exit();
require('../src/db/mongoose');

const User = require('../src/models/user.model');
const Voice = require('../src/models/voice.model');

(async () => {
  await User.create({
    role: 1,
    email: 'thinhhanh1@gmail.com',
    password: 'manhthinh',
  });

  await Voice.create({
    _id: 'FIN',
    name: 'FIN',
  });

  await Voice.create({
    _id: 'NA1',
    name: 'NA1',
  });

  await Voice.create({
    _id: 'NA2',
    name: 'NA2',
  });

  await Voice.create({
    _id: 'INI',
    name: 'INI',
  });

  process.exit();
})();
