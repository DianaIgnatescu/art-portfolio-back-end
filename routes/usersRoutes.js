const { authenticate } = require('../authenticate');
const express = require('express');
const bcrypt = require('bcryptjs');
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Users.deleteUser(id)
    .then((data) => {
      if(!data) {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The user with the id ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The user could not be removed.' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if(user.password) {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
  }
  Users.editUser(user, id)
      .then((data) => {
        if(!data) {
          res.status(404).json({ message: 'The user with the specified ID does not exist.' });
        } else {
          res.status(200).json({ user: { id, ...user }});
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The user information could not be modified'});
      });
});

module.exports = router;
