const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticate, jwtKey } = require('../authenticate');
const db = require('../data/dbConfig');
const router = express.Router();

router.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  let user = req.body;
  const hashedPw = bcrypt.hashSync(user.password, 10);
  user.password = hashedPw;
  if (!username || !password || !email) {
    res.status(400).json({ errorMessage: 'Missing username or password.'})
  } else {
    db('users').insert(user)
      .then(arrayOfIds => {
        return db('users').where({ id: arrayOfIds[0] });
      })
      .then(arrayOfUsers => {
        res.status(201).json(arrayOfUsers[0])
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'The user could not be created.' });
      })
  }
});

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    email: user.email
  };
  const options = {
    expiresIn: '1h',
  };
  const token = jwt.sign(payload, jwtKey, options);
  return token;
};

router.post('/login', (req, res) => {
  const {username, password } = req.body;
  const user = req.body;
  if (!username || !password) {
    res.status(400).json({ errorMessage: 'Missing username or password.' });
  } else {
    db('users')
      .where({ username: user.username })
      .first()
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome ${user.username}!`, token,
          });
        } else {
          res.status(401).json({ message: 'Invalid credentials.'});
        }
      })
      .catch((error) => {
        res.status(500).json({ errorMessage: 'Login unsuccessful.' })
      });
  }
});

module.exports = router;

