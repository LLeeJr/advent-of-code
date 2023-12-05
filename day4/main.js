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
const content = fs.readFileSync('./input', 'utf8');
// part 1
const cards = content.split('\n')
    .map((line) => line.split(':'))
    .map(([description, winningAvailable]) => {
    const numbers = winningAvailable.split('|')
        .map((number) => number.split(' ')
        .filter((number) => !isNaN(parseInt(number))));
    return {
        number: parseInt(description.split(' ')[1]),
        winningNumbers: numbers[0].map((number) => parseInt(number)),
        availableNumbers: numbers[1].map((number) => parseInt(number)),
    };
});
const points = cards.map((card) => {
    return 2 ** (card.availableNumbers
        .filter((number) => card.winningNumbers.includes(number)).length - 1);
})
    .filter((value) => value >= 1)
    .reduce((acc, value) => acc + value, 0);
console.log(points);
// part 2
const wins = cards.map((card) => {
    return card.availableNumbers
        .filter((number) => card.winningNumbers.includes(number)).length;
});
let scratchcards = [...Array(wins.length).keys()].map(i => 1);
wins.forEach((win, index) => {
    for (let j = 0; j < scratchcards[index]; j++) {
        for (let i = index + 1; i < index + 1 + win; i++) {
            scratchcards[i] += 1;
        }
    }
});
console.log(scratchcards.reduce((acc, value) => acc + value, 0));
