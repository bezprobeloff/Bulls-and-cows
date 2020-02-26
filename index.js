let numberUser;
let numberSecret = `538902`;
const countDigits = numberSecret.toString().length;

const readlineSync = require(`readline-sync`);
numberUser = readlineSync.question(`Enter a number (`
  + countDigits + ` digits): `);
if (numberUser === numberSecret) {
  console.log(`Вы выиграли.`);
} else if (countDigits === numberUser.toString().length) {
  let arrDigitsInPlace = Array.from(numberUser).filter(function(item, index) {
    if (item === numberSecret[index]) {
      return item;
    }
  });

  let arrDigitsNotInPlace = Array.from(numberUser).filter(function(item, index) {
    if ((item !== numberSecret[index]) && (numberSecret.includes(item))) {
      return item;
    }
  });

  console.log(`Cовпавших цифр не на своих местах -
    ${arrDigitsNotInPlace.length} (${arrDigitsNotInPlace}), ` +
    `цифр на своих местах - ${arrDigitsInPlace.length} (${arrDigitsInPlace})`);

} else {
  console.log(`Ошибка. Введите корректное число (`
    + countDigits + ` значное)`);
}
