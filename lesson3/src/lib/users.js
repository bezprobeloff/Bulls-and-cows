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
  },
];

const sessions = {};

function clearUsers() {
  users.length = 0;
}

function getUsers() {
  return users;
}

function checkSessionID(sessionID) {
  return sessions[sessionID];
}

function getSessions() {
  return sessions;
}

function authMiddleware(req, res, next) {
  // console.log('authMiddleware is running');
  const userData = checkSessionID(req.headers.authorization);
  req.userCredentials = userData;
  next();
}

// проверка наличия юзера в базе
function checkUser(newUser) {
  const user = users.find((item) => item.login === newUser);
  if (user) {
    return true;
  }
  return false;
}

// проверка авторизации пользователя
// если успешно, то возвращает sessionID
function checkLogin(login, password) {
  const user = users.find((item) => (item.login === login) && (item.password === password));
  if (user) {
    const sessionID = uuid.v4();
    sessions[sessionID] = {
      id: user.id,
    };
    return sessionID;
  }

  return -1;
}

function registerUser(newLogin, newPassword) {
  if ((checkLogin(newLogin, newPassword) === -1)) {
    users.push({
      id: users.length + 1,
      login: newLogin,
      password: newPassword,
    });

    return 1;
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
  restricted,
  clearUsers,
  getUsers,
  registerUser,
  checkUser,
  getSessions,
};
