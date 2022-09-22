const { ObjectId } = require('mongodb');

const fs = require('fs');
const readline = require('readline');

const AudioTrainning = require('../src/models/audioTrainning.model');
require('../src/db/mongoose');

async function processLineByLine() {
    await AudioTrainning.updateMany(
        {},
        {
            editors: [], 
            transcripts: [
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c4"),
                content: "Giọng của một người (nam)",
                numberOfVotes: 0,
                },
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c5"),
                content: "Giọng của một người (nữ)",
                numberOfVotes: 0,
                },
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c6"),
                content: "Giọng 2 người khác nhau",
                numberOfVotes: 0,
                },
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c7"),
                content: "Có 2 người nói trong audio 1",
                numberOfVotes: 0,
                },
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c8"),
                content: "Có 2 người nói trong audio 2",
                numberOfVotes: 0,
                },
                {
                _id: false,
                teamId: ObjectId("6309c7b556970f70c831b9c9"),
                content: "Cả 2 audio có 2 người nói",
                numberOfVotes: 0,
                },
            ]}
    )
    // create({
    // competitionId: ObjectId('62ee9abba2a348d926b43e27'),
    // link: wav1,
    // link2: wav2,
    // rawOriginContent: null,
    // transcripts: [
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c4"),
    //     content: "Giọng của một người (nam)",
    //     numberOfVotes: 0,
    //     },
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c5"),
    //     content: "Giọng của một người (nữ)",
    //     numberOfVotes: 0,
    //     },
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c6"),
    //     content: "Giọng 2 người khác nhau",
    //     numberOfVotes: 0,
    //     },
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c7"),
    //     content: "Có 2 người nói trong audio 1",
    //     numberOfVotes: 0,
    //     },
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c8"),
    //     content: "Có 2 người nói trong audio 2",
    //     numberOfVotes: 0,
    //     },
    //     {
    //     _id: false,
    //     teamId: ObjectId("6309c7b556970f70c831b9c9"),
    //     content: "Cả 2 audio có 2 người nói",
    //     numberOfVotes: 0,
    //     },
    // ],
    // textLength: 0,
    // sizeInKilobytes: 0,
    // label: '',
    // });
}

processLineByLine();

console.log("Done");