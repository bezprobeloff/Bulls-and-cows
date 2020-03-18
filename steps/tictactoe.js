const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;

function writeBox(x, y, player, box) {
  const test = box.split('|').map((itemY, indexY) => {
    if (indexY === (Number(y) - 1)) {
      itemY = itemY.split('').map((itemX, indexX) => {
        if (indexX === (Number(x) - 1) && (itemX !== 0)) {
          return player;
        }
        return itemX;
      }).join('');
    }
    return itemY;
  }).join('|');

  return test;
}


defineSupportCode(({ Given, Then, When }) => {
  let box = '';
  let player;

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
    box = writeBox(x, y, player, box);
    if (player === 1) {
      player = 2;
    } else {
      player = 1;
    }
  });

  Then('поле становится {string}', (string) => {
    expect(box).to.equal(string);
  });

  Then('возвращается ошибка', () => {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
});
