const db = require('../../data/dbConfig');

const registerUser = async (user) => {
  const [id] = await db('users').insert(user);
  return db('users').where({ id }).first();
};

module.exports = {
  registerUser,
};
