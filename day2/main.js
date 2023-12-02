"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
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
                return parseInt(cube.substring(0, cube.length - cube.indexOf('red') - 1)) <= availableCubes[0];
            }
            else if (cube.includes('blue')) {
                return parseInt(cube.substring(0, cube.length - cube.indexOf('blue') - 1)) <= availableCubes[1];
            }
            else if (cube.includes('green')) {
                return parseInt(cube.substring(0, cube.length - cube.indexOf('green') - 1)) <= availableCubes[2];
            }
        }).reduce((acc, curr) => acc && curr, true);
    }).reduce((acc, curr) => acc && curr, true);
    if (validGame) {
        result += (index + 1);
    }
});
console.log(result);
