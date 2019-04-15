const db = require('../../data/dbConfig');

const getPosts = () => {
  return db('posts');
};

const getPostById = (id) => {
  return db('posts')
      .where({ id})
      .first();
};

const getPostsFromUser = (userId) => {
  return db('posts as p')
    .join('users as u', 'u.id', 'p.user_id')
    .select('p.id', 'p.text', 'u.name as postedBy')
    .where('p.user_id', userId);
};

const addPost = (post) => {
  return db('posts')
    .insert(post)
    .then(ids => {
      return getPostById(ids[0]);
    });
};

const deletePost = (id) => {
  return db('posts')
    .where({id})
    .del();
};

const editPost = (post, id) => {
  return db('posts')
    .where({ id })
    .update(post);
};

module.exports = {
  getPosts,
  getPostById,
  getPostsFromUser,
  addPost,
  deletePost,
  editPost
};
