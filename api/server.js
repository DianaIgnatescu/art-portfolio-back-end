const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { authenticate, jwtKey } = require('../authenticate');

const db = require('../data/dbConfig');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

const auth = require('../routes/authRoutes');
const users = require('../routes/usersRoutes');
const posts = require('../routes/postsRoutes');

server.use('/api', auth);
server.use('/api/users', users);
server.use('/api/posts', posts);

server.get('/api', authenticate, (req, res) => {
  res.status(200).json({ data: 'The server is up and running!'});
});

module.exports = server;
