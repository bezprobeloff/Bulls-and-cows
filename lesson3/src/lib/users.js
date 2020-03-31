const uuid = require('uuid');

const users = [
  {
    id: 1,
    login: 'user1',
    password: 'pass1',
  },
  {
    id: 2,
    login: 'user2',
    password: 'pass2',
  }
];

const sessions = {};

function checkSessionID(sessionID) {
  return sessions[sessionID];
}

function authMiddleware(req, res, next) {
  console.log('authMiddleware is running');
  const userData = checkSessionID(req.headers.authorization);
  req.userCredentials =userData;
  next();
}

function checkLogin(login, password) {
  const user = users.find((item) => item.login === login && item.password === password);
  if (user) {
    const sessionID = uuid.v4();
    sessions[sessionID] = {
      id: user.id,
    }
    return sessionID;
  }

  return -1;
}

function restricted(req, res, next) {
  if (!req.userCredentials) {
    res.send(401);
  } else {
    next();
  }
}

module.exports = {
  checkLogin,
  checkSessionID,
  authMiddleware,
  restricted
};
