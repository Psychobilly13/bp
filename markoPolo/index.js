// TODO: move to ./utils/number.js
function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** get number in range from 1 to 100 */
const number = getRandomNumberInRange(1, 1000);

function startMarkoPolo(num) {
    /** check if the number is divisible by 3 and 5 */
    const isDivisibleBy3 = num % 3 === 0;
    const isDivisibleBy5 = num % 5 === 0;

    /** use a ternary operator to determine the output based on divisibility */
    return isDivisibleBy3 && isDivisibleBy5 ? "Марко Полло" : isDivisibleBy3 ? "Марко" : isDivisibleBy5 ? "Полло" : num;
}

const result = startMarkoPolo(number);

console.log(result);