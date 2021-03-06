const router = require('express').Router();
const controller = require('./game');
const users = require('./lib/users');

router.post('/createGame', (req, res) => {
  res.send(200, controller.createGame('parentUser'));
});

router.post('/resetField', (req, res) => {
  res.send(200, controller.reset());
});

//router.get('/getFIeld', users.restricted, (req, res) => {
router.get('/getFIeld', (req, res) => {
  res.send(200, controller.getField());
});

router.get('/getUsers', (req, res) => {
  res.send(200, users.getUsers());
});

router.get('/getSessions', (req, res) => {
  res.send(200, users.getSessions());
});

router.post('/clearUsers', (req, res) => {
  res.send(200, users.clearUsers());
});

//router.get('/getListGames', users.restricted, (req, res) => {
router.get('/getListGames', (req, res) => {
  res.send(200, controller.getListGames());
});

//router.post('/move', users.restricted, (req, res) => {
router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  res.send(200, 'ok');
});

router.post('/login', (req, res) => {
  const userID = users.checkLogin(req.body.login, req.body.password);
  res.send(200, userID);
});

router.post('/register', (req, res) => {
  const newUser = users.registerUser(req.body.login, req.body.password);
  if (newUser !== -1) {
    res.send(200, newUser);
  } else {
    res.send(400);
  }
});

module.exports = router;
