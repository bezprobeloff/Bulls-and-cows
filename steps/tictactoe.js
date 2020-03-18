const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;

function writeBox(x, y, player, box) {
  const move = box.split('|').map((itemY, indexY) => {
    if (indexY === (Number(y) - 1)) {
      // eslint-disable-next-line no-param-reassign
      itemY = itemY.split('').map((itemX, indexX) => {
        if (indexX === (Number(x) - 1) && (itemX !== 0)) {
          return player;
        }
        return itemX;
      })
        .join('');
    }
    return itemY;
  }).join('|');

  return move;
}

function correctMove(x, y, box) {
  const correct = box.split('|')
    .filter((item, index) => index === Number(y) - 1)
    .join('')
    .split('')
    .filter((item, index) => index === Number(x) - 1)
    .join('');

  if (correct !== '0') return false;

  return true;
}

function getWinner(player, box) {
  const arrBox = box.split('|');
  // создаем массив переводим вертикальные строки в горизонтальные
  const arrVertical = ['', '', ''];
  arrBox.forEach((item) => {
    item.split('').forEach((char, index) => {
      arrVertical[index] += char;
    });
  });
  const checkHorizontal = arrBox
    .filter((item) => item.match(/(.)\1{2}/i) !== null);

  const checkVertical = arrVertical
    .filter((item) => item.match(/(.)\1{2}/i) !== null);


  return 0;
}

getWinner('1', '121|121|222');

defineSupportCode(({ Given, Then, When }) => {
  let box = '';
  let player;
  let status;

  Given('пустое поле', () => {
    box = '000|000|000';
  });

  Given('поле {string}', (string) => {
    box = string;
  });

  Given('ходит игрок {int}', (namePlayer) => {
    player = namePlayer;
  });

  Given('игрок ходит в клетку {int}, {int}', (x, y) => {
    status = correctMove(x, y, box);
    if (status) box = writeBox(x, y, player, box);

    if (player === 1 && status) {
      player = 2;
    } else if (player === 2 && status) {
      player = 1;
    }
  });

  Then('поле становится {string}', (string) => {
    expect(box).to.equal(string);
  });

  Then('возвращается ошибка', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(status).to.false;
  });

  Then('победил игрок {int}', (int) => {
    // Then('победил игрок {float}', function (float) {
      // Write code here that turns the phrase above into concrete actions
      return 'pending';
    });
});
