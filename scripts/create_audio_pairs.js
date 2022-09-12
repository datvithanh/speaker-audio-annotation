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

// arab.csv       indo.csv       mongolian.csv  vietnam.csv
// france.csv     japan.csv      thailand.csv

async function processLineByLine() {
  const fileStream = fs.createReadStream('/Users/dat.vithanh/Desktop/audio_files/vietnam.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    let wav1 = "https://storage.googleapis.com/sv_vlsp_2021/audio_files/" + line.split(",")[2].replace("/home3/thanhpv/gdrive/msv_video_video_cut/", "");
    let wav2 = "https://storage.googleapis.com/sv_vlsp_2021/audio_files/" + line.split(",")[3].replace("/home3/thanhpv/gdrive/msv_video_video_cut/", "");
    if (line.split(",")[2] !== "utt1") {
      console.log(wav1, wav2);
      AudioTrainning.create({
        competitionId: ObjectId('62ee9abba2a348d926b43e27'),
        link: wav1,
        link2: wav2,
        rawOriginContent: null,
        transcripts: [
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            teamId: "6309c7b556970f70c831b9c4",
            content: "Giọng của một người (nam)",
            numberOfVotes: 0,
          },
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            content: "Giọng của một người (nữ)",
            numberOfVotes: 0,
          },
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            content: "Giọng 2 người khác nhau",
            numberOfVotes: 0,
          },
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            content: "Có 2 người nói trong audio 1",
            numberOfVotes: 0,
          },
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            content: "Có 2 người nói trong audio 2",
            numberOfVotes: 0,
          },
          {
            _id: false,
            teamId: ObjectId("6309c7b556970f70c831b9c4"),
            content: "Cả 2 audio có 2 người nói",
            numberOfVotes: 0,
          },
        ],
        textLength: 0,
        sizeInKilobytes: 0,
        label: '',
      });
    }
  }
}

processLineByLine();

console.log("Done");