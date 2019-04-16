const db = require('../../data/dbConfig');

const getPosts = () => db('posts');

const getPostById = id => db('posts')
  .where({ id })
  .first();

const getPostsFromUser = id => db('posts').where({ userId: id });

const addPost = post => db('posts')
  .insert(post)
  .then(ids => getPostById(ids[0]));

const deletePost = id => db('posts')
  .where({ id })
  .del();

const editPost = (post, id) => db('posts')
  .where({ id })
  .update(post);

const getAllUpvotes = async () => db('likes');

const getUpvotes = async (postId) => {
  const query = await db('likes').where({ postId }).count('id as CNT');
  const total = query[0].CNT;
  return total;
};

const upvote = async (userId, postId) => {
  const query = await db('likes')
    .where({ postId })
    .where({ userId })
    .count('id as CNT');

  const total = query[0].CNT;

  if (total) {
    throw new Error('Like already in database');
  } else {
    return await db('likes').insert({ userId, postId });
  }
};

const downvote = async (userId, postId) => {
  const query = await db('likes')
    .where({ postId })
    .where({ userId })
    .count('id as CNT');

  const total = query[0].CNT;

  if (!total) {
    throw new Error('Like not in database');
  } else {
    return await db('likes')
      .where({ postId })
      .where({ userId })
      .first()
      .del();
  }
};

module.exports = {
  getPosts,
  getPostById,
  getPostsFromUser,
  addPost,
  deletePost,
  editPost,
  upvote,
  downvote,
  getUpvotes,
  getAllUpvotes,
};
