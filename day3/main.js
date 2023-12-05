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
const lines = content.split('\n');
const symbols = [];
const numbers = [];
let lastNumberIndex = -1;
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char !== '.' && isNaN(parseInt(char))) {
            symbols.push({ x, y, value: char });
        }
        else if (!isNaN(parseInt(char))) {
            if (lastNumberIndex !== -1 && lastNumberIndex === x - 1) {
                numbers[numbers.length - 1].x_end = x;
                numbers[numbers.length - 1].value = parseInt(`${numbers[numbers.length - 1].value}${char}`);
            }
            else {
                numbers.push({ x_start: x, x_end: x, y, value: parseInt(char) });
            }
            lastNumberIndex = x;
        }
    });
});
function getNumbersToConsider(numbers, symbol) {
    return numbers.filter((number) => number.x_start <= symbol.x && number.x_end >= symbol.x
        || number.x_start <= symbol.x + 1 && number.x_end >= symbol.x + 1
        || number.x_start <= symbol.x - 1 && number.x_end >= symbol.x - 1);
}
let partNumber = 0;
let gearRatio = 0;
symbols.forEach((symbol) => {
    const numbersAbove = numbers.filter((number) => number.y === symbol.y - 1);
    const numbersToConsider = [...getNumbersToConsider(numbersAbove, symbol)];
    const numbersBelow = numbers.filter((number) => number.y === symbol.y + 1);
    numbersToConsider.push(...getNumbersToConsider(numbersBelow, symbol));
    const numbersInSameLine = numbers.filter((number) => number.y === symbol.y);
    numbersToConsider.push(...numbersInSameLine.filter((number) => number.x_start === symbol.x - 1
        || number.x_end === symbol.x - 1
        || number.x_start === symbol.x + 1));
    partNumber += numbersToConsider.reduce((acc, curr) => acc + curr.value, 0);
    if (symbol.value === '*' && numbersToConsider.length === 2) {
        gearRatio += numbersToConsider.reduce((acc, curr) => acc * curr.value, 1);
    }
});
console.log(partNumber);
console.log(gearRatio);
