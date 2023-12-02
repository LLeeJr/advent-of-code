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
const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const replaceWith = ['o1e', 't2o', 't3ree', 'f4ur', 'f5ve', 's6x', 's7ven', 'e8ght', 'n9ne'];
const content = fs.readFileSync('./input', 'utf8');
const lines = content.split('\n');
const numbers = lines
    .map((line) => {
    const includedDigits = [];
    digits.forEach((digit, index) => {
        if (line.includes(digit)) {
            line = line.replaceAll(digit, replaceWith[index]);
        }
    });
    return line;
})
    .map((line) => {
    var numbers = [];
    for (let i = 0; i < line.length; i++) {
        if (!isNaN(parseInt(line.charAt(i)))) {
            numbers.push(parseInt(line.charAt(i)));
        }
    }
    return (numbers.length > 1)
        ? { first: numbers[0], last: numbers[numbers.length - 1] }
        : { first: numbers[0], last: numbers[0] };
});
const result = numbers.map((object) => parseInt(`${object.first}${object.last}`)).reduce((a, b) => a + b, 0);
console.log(result);
