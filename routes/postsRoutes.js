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

router.post('/', authenticate, (req, res) => {
  const { postName, userId, imageUrl, description, upvotes } = req.body;
  const post = req.body;
  if (!postName || !userId || !imageUrl) {
    res.status(400).json({ errorMessage: 'Please provide information for the post.'});
  }
  Posts.addPost({ postName, userId, imageUrl, description, upvotes: 0 })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: 'There was an error while saving the post to the database.'});
    });
});

router.delete('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  Posts.deletePost(id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ message: `The post with the ID ${id} has now been removed from the database.` });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'The post could not be removed.' });
    });
});

router.put('/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const post = req.body;
  const { postName, userId, imageUrl, description, upvotes } = req.body;
  Posts.editPost(post, id)
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: 'The post with the specified id does not exist.' });
      } else {
        res.status(200).json({ post: { id, ...post} });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'The post information could not be modified.' });
    });
});

router.get('/upvotes/:postId', async (req, res) => {
  const { postId } = req.params;
  const likes = await Posts.getUpvotes(postId);
  res.status(200).json({ success: true, postId, likes });
});

router.put('/upvote/:postId/:userId', async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Posts.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await Users.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const result = await Posts.upvote(userId, postId);
    res.status(200).json({ success: true, userId, postId });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

router.put('/downvote/:postId/:userId', async (req, res) => {
  const { postId, userId } = req.params;
  try {
    const post = await Posts.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }
    const user = await Users.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const result = await Posts.downvote(userId, postId);
    res.status(200).json({ success: true, userId, postId });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = router;