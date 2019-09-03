// remembering add process.exit();
require('../src/db/mongoose');

const Voice = require('../src/models/voice.model');

(async () => {
  await Voice.findByIdAndUpdate('FIN', {
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await Voice.findByIdAndUpdate('INI', {
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await Voice.findByIdAndUpdate('NA1', {
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await Voice.findByIdAndUpdate('NA2', {
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  process.exit();
})();
