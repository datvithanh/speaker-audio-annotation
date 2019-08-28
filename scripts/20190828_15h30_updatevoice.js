// remembering add process.exit();
require('../src/db/mongoose');

const Voice = require('../src/models/voice.model');

(async () => {
  await Voice.findByIdAndUpdate('NA1', { name: 'NA1' });
  await Voice.findByIdAndUpdate('NA2', { name: 'NA2' });

  process.exit();
})();
