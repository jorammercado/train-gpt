const standings = require("./teamsRawData.json")
const fs = require('fs')

const season = standings.parameters.season
const league = "NBA"
const allData = standings.response[0] //array of objects
const stage = standings.response[0][0].stage

const westernConference = allData.filter(e => e.group.name === "Western Conference")
const easternConference = allData.filter(e => e.group.name === "Eastern Conference")
const data = [westernConference, easternConference]
const prompts = []
const responses = []

//general testing prompts/answers
prompts.push("What is the current season?")
responses.push(`The current season is ${season}.`)
prompts.push("What is the league?")
responses.push(`The league is ${league}.`)
prompts.push("In what stage is the NBA currently in?")
responses.push(`The NBA is current in the ${stage}.`)
prompts.push("How many teams are there in the NBA?")
responses.push(`There are 30 teams in the NBA.`)
prompts.push("How many conferences are there in the NBA?")
responses.push(`There are 2 conferences.`)
prompts.push("What are the two names of the conferences in the NBA?")
responses.push(`The Western Conference and the Eastern Conference.`)
prompts.push("In what country does the NBA play?")
responses.push(`The USA.`)

// actual data for west and east
// 2 arrays prompts and responses given for clarity, though these will be combined
for (let j = 0; j < data.length; j++) {
    for (let i = 0; i < data[j].length; i++) {
        prompts.push(`Who is at position ${data[j][i].position} in the ${data[j][i].group.name}?`)
        responses.push(`The ${data[j][i].team.name}.`)
        prompts.push(`How many games have the ${data[j][i].team.name} played in total?`)
        responses.push(`The ${data[j][i].team.name} have played ${data[j][i].games.played} in total.`)
        prompts.push(`How many games have the ${data[j][i].team.name} won?`)
        responses.push(`The ${data[j][i].team.name} have won ${data[j][i].games.win.total}.`)
        prompts.push(`What percentage of games have ${data[j][i].team.name} won?`)
        responses.push(`The percentage of games that ${data[j][i].team.name} have won are ${data[j][i].games.win.percentage}.`)
        prompts.push(`How many games have the ${data[j][i].team.name} lost?`)
        responses.push(`The ${data[j][i].team.name} have lost ${data[j][i].games.lose.total}.`)
        prompts.push(`What percentage of games have ${data[j][i].team.name} lost?`)
        responses.push(`The percentage of games that ${data[j][i].team.name} have lost are ${data[j][i].games.lose.percentage}.`)
        prompts.push(`How many points have ${data[j][i].team.name} accumulated for?`)
        responses.push(`The ${data[j][i].team.name} have accumulated ${data[j][i].points.for} points for.`)
        prompts.push(`How many points have ${data[j][i].team.name} accumulated against?`)
        responses.push(`The ${data[j][i].team.name} have accumulated ${data[j][i].points.against} points against.`)
    }
}

const result = []
for (let i = 0; i < prompts.length; i++) {
    result.push(prompts[i])
    result.push(responses[i])
}

const jsonContent = JSON.stringify(result, null, 2)
fs.writeFile('convertedTeamsData.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err)
    }
    console.log("JSON file has been saved.")
})
