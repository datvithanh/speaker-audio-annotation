const { ObjectId } = require('mongodb');

const Competition = require('../src/models/competition.model');
require('../src/db/mongoose');

async function createCompetition() {
    const competition = await Competition.create({
        name: "VLSP 2022",
        rules: { numberOfAudiosPerListener: 50, numberOfMinVotersToAcceptAudio: 3 },
        timeExpired: Date(),
        });
    console.log(competition);
}

createCompetition();

console.log("Done");