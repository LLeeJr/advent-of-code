import * as fs from 'fs';

type Symbol = {x: number, y: number, value: string};
type Number = {x_start: number, x_end: number, y: number, value: number};

const content = fs.readFileSync('./input', 'utf8');
const lines = content.split('\n');

const symbols: Symbol[] = [];
const numbers: Number[] = [];
let lastNumberIndex = -1;
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char !== '.' && isNaN(parseInt(char))) {
            symbols.push({x, y, value: char});
        } else if (!isNaN(parseInt(char))) {
            if (lastNumberIndex !== -1 && lastNumberIndex === x - 1) {
                numbers[numbers.length - 1].x_end = x;
                numbers[numbers.length - 1].value = parseInt(`${numbers[numbers.length - 1].value}${char}`);
            } else {
                numbers.push({x_start: x, x_end: x, y, value: parseInt(char)});
            }
            lastNumberIndex = x;
        }
    });
});

function getNumbersToConsider(numbers: Number[], symbol: Symbol) {
    return numbers.filter((number) => number.x_start <= symbol.x && number.x_end >= symbol.x
    || number.x_start <= symbol.x + 1 && number.x_end >= symbol.x + 1
    || number.x_start <= symbol.x - 1 && number.x_end >= symbol.x - 1);
}

let partNumber = 0;
let gearRatio = 0;
symbols.forEach((symbol) => {
    const numbersAbove = numbers.filter((number) => number.y === symbol.y - 1);
    const numbersToConsider = [...getNumbersToConsider(numbersAbove, symbol)]

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