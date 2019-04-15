const { authenticate } = require('../authenticate');
const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig');
const Users = require('../api/helpers/usersHelpers');

router.get('/', (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error: 'The users could not be retrieved.'});
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Users.getUserById(id)
      .then((user) => {
        if(!user) {
          res.status(404).json({ message: 'The user with the specified ID does not exist.'});
        } else {
          res.status(200).json(user);
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The user information could not be retrieved.' });
      });
});

module.exports = router;
