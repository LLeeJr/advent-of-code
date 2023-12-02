import * as fs from "fs";

const availableCubes = [12, 14, 13]; // red, blue, green


const content = fs.readFileSync('./games', 'utf8');
const games = content.split('\n');

const allGames = games.map((game) => game.split(':')[1].split(';'));

partOne(allGames);
partTwo(allGames);
function partTwo(allGames: string[][]) {
    const result = allGames.map((game) => {
        const minimumSet: {red: number | null, blue: number | null, green: number | null} = {red: null, blue: null, green: null};
        game.forEach((round) => {
            const cubes = round.split(',');

            cubes.forEach((cube) => {
                cube = cube.trim();
                if (cube.includes('red')) {
                    const digit = parseInt(cube.substring(0, cube.length - cube.indexOf('red') - 1));
                    if (minimumSet.red === null || minimumSet.red < digit) {
                        minimumSet.red = digit;
                    }
                } else if (cube.includes('blue')) {
                    const digit = parseInt(cube.substring(0, cube.length - cube.indexOf('blue') - 1));
                    if (minimumSet.blue === null || minimumSet.blue < digit) {
                        minimumSet.blue = digit;
                    }
                } else if (cube.includes('green')) {
                    const digit = parseInt(cube.substring(0, cube.length - cube.indexOf('green') - 1));
                    if (minimumSet.green === null || minimumSet.green < digit) {
                        minimumSet.green = digit;
                    }
                }
            })
        })
        return minimumSet
    }).reduce((acc, curr) => acc + curr.red! * curr.blue! * curr.green!, 0);

    console.log(result);
}


function partOne(allGames: string[][]) {
    let result = 0;

    allGames.forEach((game, index) => {
        const validGame = game.map((round) => {
            const cubes = round.split(',');

            return cubes.map((cube) => {
                cube = cube.trim();
                if (cube.includes('red')) {
                    return parseInt(cube.substring(0, cube.length - cube.indexOf('red') - 1)) <= availableCubes[0];
                } else if (cube.includes('blue')) {
                    return parseInt(cube.substring(0, cube.length - cube.indexOf('blue') - 1)) <= availableCubes[1];
                } else if (cube.includes('green')) {
                    return parseInt(cube.substring(0, cube.length - cube.indexOf('green') - 1)) <= availableCubes[2];
                }
            }).reduce((acc, curr) => acc && curr, true);
        }).reduce((acc, curr) => acc && curr, true);

        if (validGame) {
            result += (index + 1);
        }
    });

    console.log(result);
}