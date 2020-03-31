const { Given, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const app = require('../src/server');
const controller = require('../src/game');

// eslint-disable-next-line no-unused-vars
let lastResult = {};

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {int}', (i) => {
  controller.setCurrentPlayer(i);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  if (controller.correctMove(x, y)) {
    request(app)
      .post('/move')
      .send({ x, y })
      .then((res) => {
        lastResult = res;
      });
  }
});

Then('поле становится {string}', (box) => {
  return request(app)
    .get('/getFIeld')
    .expect(controller.convertTxtToArr(box));
});

Then('возвращается ошибка', () => {
  assert.equal(controller.getStatusCorretMove(), false);
});

Then('победил игрок {int}', (player) => {
  assert.equal(controller.getWinner(controller.getField()), player);
});

Given('поле {string}', (box) => {
  controller.presetField(controller.convertTxtToArr(box));
});
