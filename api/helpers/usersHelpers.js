const db = require('../../data/dbConfig');

const getUsers = () => {
  return db('users');
};

const getUserById = (id) => {
  return db('users')
      .where({ id })
      .first();
};

// const addUser = async (user) => {
//   const [id] = await db('users').insert(user);
//   return db('users').where({ id }).first();
// };

const deleteUser = (id) => {
  return db('users').where({ id }).del();
};

const editUser = (changes, id) => {
  return db('users').where({ id }).update(changes);
};

module.exports = {
  getUsers,
  getUserById,
  // addUser,
  deleteUser,
  editUser,
};
