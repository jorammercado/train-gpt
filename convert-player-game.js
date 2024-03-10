const players = require("./playersGamesRawData.json")
const fs = require('fs')

const league = "NBA"
const prompts = []
const responses = []


for (let i = 0; i < players.length; i++) { // PLAYERS
    for (let j = 0; j < players[i].response.length; j++) { // GAMES
        const player = `${players[i].response[j].player.firstname} ${players[i].response[j].player.lastname}`
        const team = `${players[i].response[j].team.name}`

        prompts.push(`How many points did ${player} score in the ${j + 1} game of the season?`)
        responses.push(`${player} scored ${players[i].response[j].points} points.`)
        prompts.push(`What position did player ${player} play in the ${j + 1} game of the season?`)
        responses.push(`${player} position was ${players[i].response[j].pos}.`)
        prompts.push(`How many minutes did player ${player} play in the ${j + 1} game of the season?`)
        responses.push(`${player} played ${players[i].response[j].min} minutes.`)
        prompts.push(`How many field goals did ${player} make in the ${j + 1} game of the season?`)
        responses.push(`${player} made ${players[i].response[j].fgm} field goals.`)
        prompts.push(`How many field goals did ${player} attempt in the ${j + 1} game of the season?`)
        responses.push(`${player} attempted ${players[i].response[j].fga} field goals.`)
        prompts.push(`What was ${player} field goal percentage in the ${j + 1} game of the season?`)
        responses.push(`${player} field goal percentage was ${players[i].response[j].fgp}%.`)
        prompts.push(`How many (3)three-point field goals did ${player} make in the ${j + 1} game of the season?`)
        responses.push(`${player} made ${players[i].response[j].tpm} three-point field goals.`)
        prompts.push(`How many (3)three-point field goals did ${player} attempt in the ${j + 1} game of the season?`)
        responses.push(`${player} attempted ${players[i].response[j].tpa} three-point field goals.`)
        prompts.push(`What was ${player} (3)three-point field goal percentage in the ${j + 1} game of the season?`)
        responses.push(`${player} three-point field goal percentage was ${players[i].response[j].tpp}%.`)
        prompts.push(`How many offensive rebounds did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].offReb} offensive rebounds.`)
        prompts.push(`How many defensive rebounds did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].defReb} defensive rebounds.`)
        prompts.push(`How many rebounds in total did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].totReb} total rebounds.`)
        prompts.push(`How many assists did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].assists} assists.`)
        prompts.push(`How many personal fouls did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].pFouls} personal fouls.`)
        prompts.push(`How many steals did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].steals} steals.`)
        prompts.push(`How many turnovers did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].turnovers} turnovers.`)
        prompts.push(`How many blocks did ${player} get in the ${j + 1} game of the season?`)
        responses.push(`${player} obtained ${players[i].response[j].blocks} blocks.`)
        prompts.push(`Whats was ${player} 'plus-minus' in the ${j + 1} game of the season?`)
        responses.push(`${player} 'plus-minus' was ${players[i].response[j].plusMinus}.`)

        if (j === players[i].response.length - 1) {
            prompts.push(`How many points did ${player} score in his last game played?`)
            responses.push(`${player} scored ${players[i].response[j].points} points.`)
            prompts.push(`What position did player ${player} play in his last game played?`)
            responses.push(`${player} position was ${players[i].response[j].pos}.`)
            prompts.push(`How many minutes did player ${player} play in his last game played?`)
            responses.push(`${player} played ${players[i].response[j].min} minutes.`)
            prompts.push(`How many field goals did ${player} make in his last game played?`)
            responses.push(`${player} made ${players[i].response[j].fgm} field goals.`)
            prompts.push(`How many field goals did ${player} attempt in his last game played?`)
            responses.push(`${player} attempted ${players[i].response[j].fga} field goals.`)
            prompts.push(`What was ${player} field goal percentage in his last game played?`)
            responses.push(`${player} field goal percentage was ${players[i].response[j].fgp}%.`)
            prompts.push(`How many (3)three-point field goals did ${player} make in his last game played?`)
            responses.push(`${player} made ${players[i].response[j].tpm} three-point field goals.`)
            prompts.push(`How many (3)three-point field goals did ${player} attempt in his last game played?`)
            responses.push(`${player} attempted ${players[i].response[j].tpa} three-point field goals.`)
            prompts.push(`What was ${player} (3)three-point field goal percentage in his last game played?`)
            responses.push(`${player} three-point field goal percentage was ${players[i].response[j].tpp}%.`)
            prompts.push(`How many offensive rebounds did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].offReb} offensive rebounds.`)
            prompts.push(`How many defensive rebounds did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].defReb} defensive rebounds.`)
            prompts.push(`How many rebounds in total did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].totReb} total rebounds.`)
            prompts.push(`How many assists did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].assists} assists.`)
            prompts.push(`How many personal fouls did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].pFouls} personal fouls.`)
            prompts.push(`How many steals did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].steals} steals.`)
            prompts.push(`How many turnovers did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].turnovers} turnovers.`)
            prompts.push(`How many blocks did ${player} get in his last game played?`)
            responses.push(`${player} obtained ${players[i].response[j].blocks} blocks.`)
            prompts.push(`Whats was ${player} 'plus-minus' in his last game played?`)
            responses.push(`${player} 'plus-minus' was ${players[i].response[j].plusMinus}.`)
        }

    }
}

const result = []
for (let i = 0; i < prompts.length; i++) {
    result.push(prompts[i])
    result.push(responses[i])
}

const jsonContent = JSON.stringify(result, null, 2)
fs.writeFile('convertedPlayersGameData.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err)
    }
    console.log("JSON file has been saved.")
})
