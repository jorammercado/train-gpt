const games = require("./gamesRawData.json")
const fs = require('fs')

const league = "NBA"
const gamesTransform = []


for (let i = 1; i < games.length-3; i++) { // season
    for (let j = 0; j < games[i].response.length; j++) { // games
        gamesTransform.push(`Game: ${games[i].response[j].teams.home.name} (Home)` +
            ` vs ${games[i].response[j].teams.visitors.name} (Visitor).` +
            ` Outcome: ${games[i].response[j].scores.visitors.points >= games[i].response[j].scores.home.points ?
                games[i].response[j].teams.visitors.name : games[i].response[j].teams.home.name} Win.` +
            ` Final Score: ${games[i].response[j].scores.home.points}-${games[i].response[j].scores.visitors.points}`+
            ` Date: ${games[i].response[j].date.start}.`)
    }
}


const jsonContent = JSON.stringify(gamesTransform, null, 2)
fs.writeFile('convertedGamesData.json', jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occurred while writing JSON Object to File.");
        return console.log(err)
    }
    console.log("JSON file has been saved.")
})
