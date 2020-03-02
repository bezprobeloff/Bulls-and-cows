let numberUser;
let numberSecret = `538902`;
const countMoves = 3;
const countDigits = numberSecret.toString().length;

function play() {
  const readlineSync = require(`readline-sync`);
  let countMovesPlayed = countMoves;
  while(countMovesPlayed > 0) {
    numberUser = readlineSync.question(`Enter a number (${countDigits}  digits): `);

    if (numberUser === numberSecret) {
      console.log(`Вы выиграли.`);
      return;
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

      console.log(`Cовпавших цифр не на своих местах - `
        + `${arrDigitsNotInPlace.length} (${arrDigitsNotInPlace}), ` +
        `цифр на своих местах - ${arrDigitsInPlace.length} (${arrDigitsInPlace})`);
        countMovesPlayed--;
      if(countMovesPlayed > 0)
        console.log(`У вас осталось ${countMovesPlayed} попыток.`);
      else
        console.log(`Вы проиграли.`);
    } else {
      console.log(`Ошибка. Введите корректное число (${countDigits} значное)`);
    }
  }

}

play();
