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

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Posts.getPostById(id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.'});
      } else {
        res.status(200).json(post);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The post information could not be retrieved.'});
    });
});

router.post('/', (req, res) => {
  const { postName, userId, imageUrl } = req.body;
  const post = req.body;
  if (!postName || !userId || !imageUrl) {
    res.status(400).json({ errorMessage: 'Please provide information for the post.'});
  }
  Posts.addPost({ postName, userId, imageUrl })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error while saving the post to the database.'});
    });
});
