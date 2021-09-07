const { ObjectId } = require('mongodb');

const fs = require('fs');
const readline = require('readline');

const AudioTrainning = require('../src/models/audioTrainning.model');
require('../src/db/mongoose');

// (async () => {
//     await AudioTrainning.create({
//     competitionId: ObjectId('6125bd406f094a2a35e681d2'),
//     link: `asldlasdoqwld`,
//     link2: 'link2',
//     rawOriginContent: null,
//     transcripts: [],
//     textLength: 0,
//     sizeInKilobytes: 0,
//     label: '',
//   });
// })();

async function processLineByLine() {
  const fileStream = fs.createReadStream('scripts/metadata/total_shuffle.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let wav1 = line.split(" ")[0];
    let wav2 = line.split(" ")[1];
    console.log(wav1, wav2);
    AudioTrainning.create({
      competitionId: ObjectId('6136efbbfd882ac42f4d6da0'),
      link: wav1,
      link2: wav2,
      rawOriginContent: null,
      transcripts: [],
      textLength: 0,
      sizeInKilobytes: 0,
      label: '',
    });
  }
}

processLineByLine();

console.log("Done");