const players = require("./playersPersonlRawData.json")
const fs = require('fs')

const teams = {
    1: "Atlanta Hawks",
    2: "Boston Celtics",
    4: "Brooklyn Nets",
    5: "Charlotte Hornets",
    6: "Chicago Bulls",
    7: "Cleveland Cavaliers",
    8: "Dallas Mavericks",
    9: "Denver Nuggets",
    10: "Detroit Pistons",
    11: "Golden State Warriors",
    14: "Houston Rockets",
    15: "Indiana Pacers",
    16: "LA Clippers",
    17: "Los Angeles Lakers",
    19: "Memphis Grizzlies",
    20: "Miami Heat",
    21: "Milwaukee Bucks",
    22: "Minnesota Timberwolves",
    23: "New Orleans Pelicans",
    24: "New York Knicks",
    25: "Oklahoma City Thunder",
    26: "Orlando Magic",
    27: "Philadelphia 76ers",
    28: "Phoenix Suns",
    29: "Portland Trail Blazers",
    30: "Sacramento Kings",
    31: "San Antonio Spurs",
    38: "Toronto Raptors",
    40: "Utah Jazz",
    41: "Washington Wizards",
}

const league = "NBA"
const prompts = []
const responses = []

// actual data 
// 2 arrays prompts and responses given for clarity, though these will be combined

for (let i = 0; i < players.length; i++) { // TEAMS
    const team = teams[Number(players[i].parameters.team)]
    const season = players[i].parameters.season
    for (let j = 0; j < players[i].response.length; j++) { // PLAYERS
        prompts.push(`In what team does ${players[i].response[j].firstname} ${players[i].response[j].lastname} play in?`)
        responses.push(`In the ${team}.`)
        prompts.push(`When was ${players[i].response[j].firstname} ${players[i].response[j].lastname} born?`)
        responses.push(`${players[i].response[j].birth.date}.`)
        prompts.push(`What is the date of birth of ${players[i].response[j].firstname} ${players[i].response[j].lastname}?`)
        responses.push(`${players[i].response[j].birth.date}.`)
        prompts.push(`Where was ${players[i].response[j].firstname} ${players[i].response[j].lastname} born?`)
        responses.push(`${players[i].response[j].birth.country}.`)
        prompts.push(`When did ${players[i].response[j].firstname} ${players[i].response[j].lastname} start playing in the NBA?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} started playing in the NBA in ${players[i].response[j].nba.start}.`)
        prompts.push(`How many years has ${players[i].response[j].firstname} ${players[i].response[j].lastname} been a pro?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} has been a pro for ${players[i].response[j].nba.pro} years.`)
        prompts.push(`How tall or what is the height of ${players[i].response[j].firstname} ${players[i].response[j].lastname}?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} is ${players[i].response[j].height.feets} feet ${players[i].response[j].height.inches} inches.`)
        prompts.push(`What is the height of ${players[i].response[j].firstname} ${players[i].response[j].lastname} in meters?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} is ${players[i].response[j].height.meters} meters tall.`)
        prompts.push(`How much does ${players[i].response[j].firstname} ${players[i].response[j].lastname} weigh?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} weighs ${players[i].response[j].weight.pounds} pounds.`)
        prompts.push(`How much does ${players[i].response[j].firstname} ${players[i].response[j].lastname} weigh in kilograms?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} weighs ${players[i].response[j].weight.kilograms} kilograms.`)
        prompts.push(`What college or university did ${players[i].response[j].firstname} ${players[i].response[j].lastname} attend?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} attended ${players[i].response[j].college} college/university.`)
        prompts.push(`What affiliation if any does ${players[i].response[j].firstname} ${players[i].response[j].lastname} have?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} is affiliated with ${players[i].response[j].affiliation}.`)
        prompts.push(`Is ${players[i].response[j].firstname} ${players[i].response[j].lastname} currently active?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} ${players[i].response[j].leagues.standard.active?"is":"is not"} currently active.`)
        prompts.push(`What is ${players[i].response[j].firstname} ${players[i].response[j].lastname} jersey number?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} jersey number is ${players[i].response[j].leagues.standard.jersey}.`)
        prompts.push(`What position does ${players[i].response[j].firstname} ${players[i].response[j].lastname} play?`)
        responses.push(`${players[i].response[j].firstname} ${players[i].response[j].lastname} plays ${players[i].response[j].leagues.standard.pos}.`)
    }
}

const result = []
for (let i = 0; i < prompts.length; i++) {
    result.push(prompts[i])
    result.push(responses[i])
}

const jsonContent = JSON.stringify(result, null, 2)
fs.writeFile('convertedPlayersPersonalData.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err)
    }
    console.log("JSON file has been saved.")
})
