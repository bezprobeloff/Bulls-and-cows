const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const users = require('./lib/users');

const app = express();

app.use(express.json());
app.use(cors());
app.use(users.authMiddleware);
//app.use(users.restricted);
app.use(routes);

module.exports = app;
