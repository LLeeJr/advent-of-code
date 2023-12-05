import * as fs from 'fs';

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
        }
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

let scratchcards = [...Array(wins.length).keys()].map(_ => 1);

wins.forEach((win, index) => {
    for (let j = 0; j < scratchcards[index]; j++) {
        for (let i = index + 1; i < index + 1 + win; i++) {
            scratchcards[i] += 1;
        }
    }
})

console.log(scratchcards.reduce((acc, value) => acc + value, 0));