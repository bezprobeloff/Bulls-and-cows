const { Given, Then} = require('cucumber');
const request = require('supertest');
const app = require('../src/server');
const controller = require('../src/game');

let lastResult = {};

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {int}', (i) => {
  controller.setCurrentPlayer(i);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  return request(app)
    .post('/move')
    .send({ x, y })
    .then((res) => {
      lastResult = res;
    });
});


Then('поле становится {string}', (box) => {
  return request(app)
    .get('/getFIeld')
    .expect(box);
});
