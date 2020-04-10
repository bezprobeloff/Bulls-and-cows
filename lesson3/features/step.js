const { Given, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const app = require('../src/server');
const controller = require('../src/game');
const users = require('../src/lib/users');

let lastResult = {};

Given('пустое поле', () => {
  controller.reset();
});

Given('ходит игрок {string}', (i) => {
  controller.setCurrentPlayer(i);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => {
  if (controller.correctMove(x, y)) {
    return request(app)
      .post('/move')
      .send({ x, y })
      .then((res) => {
        lastResult = res;
      });
  }
});

Then('поле становится {string}', (box) => {
  console.log(controller.getField());
  return request(app)
    .get('/getFIeld')
    .expect(controller.convertTxtToArr(box));
});

Then('возвращается ошибка', () => {
  assert.equal(controller.getStatusCorretMove(), false);
});

Then('победил игрок {string}', (player) => {
  assert.equal(controller.getWinner(controller.getField()), player);
});

Given('поле {string}', (box) => {
  controller.presetField(controller.convertTxtToArr(box));
});

Given('пустая база пользователей', () => {
  users.clearUsers();
  assert.equal(users.getUsers().length, 0);
});

Given('регистрация с использованием {string} и {string}', (login, password) => {
  return request(app)
    .post('/register')
    .send({ login, password })
    .then((res) => {
      lastResult.statusRegister = res.status;
    });
});

Then('успешная регистрация', () => {
  assert.equal(lastResult.statusRegister, 200);
});

Then('{string} присутствует в базе пользоателей', (user) => {
  return request(app)
    .get('/getUsers')
    .expect(200)
    .then((res) => {
      lastResult.getUsers = res.body;
      let findUser = null;
      if (lastResult.getUsers.length > 0) {
        findUser = lastResult.getUsers
          .slice()
          .find((item) => item.login === user);
      }

      assert.equal(findUser.login, user);
    });
});

Given('база по умолчанию', () => {
  return request(app)
    .get('/getUsers')
    .then((res) => {
      assert.notDeepEqual(res.body.length, 0);
    });
});

Given('авторизация с использованием {string} и {string}', (login, password) => {
  return request(app)
    .post('/login')
    .send({ login, password })
    .expect(200)
    .then((res) => {
      lastResult.statusAuth = res.body;
    });
});

Then('успешная авторизация', () => {
  assert.notEqual(lastResult.statusAuth, -1);
});

Given('новая игра', () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});