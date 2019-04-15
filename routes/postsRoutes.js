const { authenticate } = require('../authenticate');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../data/dbConfig');
const Posts = require('../api/helpers/postsHelpers');
const Users = require('../api/helpers/usersHelpers');

router.get('/', (req, res) => {
  if (req.query && req.query.userId) {
    Posts.getPostsFromUser(req.query.userId)
      .then((posts) => {
        if (!posts) {
          res.status(404).json({ message: 'The user with the specified ID does not have any posts' });
        } else {
          res.status(200).json(posts)
        }
      })
      .catch((error) => {
        res.status(500).json({ error: 'The user posts could not be retrieved.' });
      });
  } else {
    Posts.getPosts()
      .then((posts) => {
        res.status(200).json(posts);
      })
      .catch((error) => {
        res.status(500).json({ error: 'The posts could not be retrieved.'});
      });
  }
});
