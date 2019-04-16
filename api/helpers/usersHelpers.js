const db = require('../../data/dbConfig');

const getUsers = () => {
  return db('users');
};

const getUserById = (id) => {
  return db('users')
      .where({ id })
      .first();
};

const deleteUser = (id) => {
  return db('users').where({ id }).del();
};

const editUser = (user, id) => {
  return db('users').where({ id }).update(user);
};

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  editUser,
};
