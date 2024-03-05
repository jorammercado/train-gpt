const fs = require('fs');

// Tester converter, not all data is used from combineData.json

// Load the combinedData.json file
const combinedData = require('./combinedData.json');

// Function to convert data to ChatGPT training format
function convertToChatGPTFormat(data) {
    const lastFiveSeasons = data.slice(-5); // Get the last 5 array elements

    const trainingExamples = lastFiveSeasons.map(season => {
        const teams = season.response[0];

        const teamStats = teams.map(team => {
            console.log(team)
            const name = team.team.name;
            let wins = 'N/A';
            let losses = 'N/A';

            if (team && team.games && team.games.win && typeof team.games.win.total === 'number') {
                wins = team.games.win.total;
            }
            if (team && team.games && team.games.lose && typeof team.games.lose.total === 'number') {
                losses = team.games.lose.total;
            }

            return `${name} had ${wins} wins and ${losses} losses in the NBA Regular Season.`;
        });

        return teamStats.join('\n');
    });

    return trainingExamples;
}

// Convert data to ChatGPT format
const chatGPTFormat = convertToChatGPTFormat(combinedData);

// Save to a file
fs.writeFileSync('chatgpt_training_data.txt', chatGPTFormat.join('\n\n'), 'utf-8');

console.log('Conversion complete. Data saved to chatgpt_training_data.txt');
