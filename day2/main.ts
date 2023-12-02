import * as fs from "fs";

const colours = ['red', 'blue', 'green'];
const availableCubes = [12, 14, 13];


const content = fs.readFileSync('./games', 'utf8');
const games = content.split('\n');

const allGames = games.map((game) => game.split(':')[1].split(';'));

let result = 0;

allGames.forEach((game, index) => {
    const validGame = game.map((round) => {
        const cubes = round.split(',');

        return cubes.map((cube) => {
            cube = cube.trim();
            if (cube.includes('red')) {
                const digit = cube.substring(0, cube.length - cube.indexOf('red') - 1);
                return parseInt(digit) <= availableCubes[0];
            } else if (cube.includes('blue')) {
                const digit = cube.substring(0, cube.length - cube.indexOf('blue') - 1);
                return parseInt(digit) <= availableCubes[1];
            } else if (cube.includes('green')) {
                const digit = cube.substring(0, cube.length - cube.indexOf('green') - 1);
                return parseInt(digit) <= availableCubes[2];
            }
        }).reduce((acc, curr) => acc && curr, true);
    }).reduce((acc, curr) => acc && curr, true);

    if (validGame) {
        result += (index+1);
    }
});

console.log(result);