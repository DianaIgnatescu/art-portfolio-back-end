const db = require('../../data/dbConfig');

const getUsers = () => db('users');

const getUserById = id => db('users')
  .where({ id })
  .first();

const deleteUser = id => db('users').where({ id }).del();

const editUser = (user, id) => db('users').where({ id }).update(user);

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  editUser,
};
