const router = require('express').Router();
const controller = require('./game');
const users = require('./lib/users');

router.get('/getFIeld', users.restricted, (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  res.send(200, 'ok');
});

router.post('/login', (req, res) => {
  const userID = users.checkLogin(req.body.login, req.body.password);
  res.send(200, userID);
});

module.exports = router;
