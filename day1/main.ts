import * as fs from 'fs';

const digits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const replaceWith = ['o1e', 't2o', 't3ree', 'f4ur', 'f5ve', 's6x', 's7ven', 'e8ght', 'n9ne'];

const content = fs.readFileSync('./input', 'utf8');
const lines = content.split('\n');

const numbers = lines
    // remove this map if you want to try part one
    .map((line) => {
        const includedDigits: any[] = [];
        digits.forEach((digit, index) => {
            if (line.includes(digit)) {
                line = line.replaceAll(digit, replaceWith[index]);
            }
        })

        return line;
    })
    .map((line) => {
        var numbers: number[] = [];
        for (let i = 0; i < line.length; i++) {
            if (!isNaN(parseInt(line.charAt(i)))) {
                numbers.push(parseInt(line.charAt(i)));
            }
        }

        return (numbers.length > 1)
            ? {first: numbers[0], last: numbers[numbers.length - 1]}
            : {first: numbers[0], last: numbers[0]};
    });

const result = numbers.map((object) => parseInt(`${object.first}${object.last}`)).reduce((a, b) => a + b, 0);

console.log(result);