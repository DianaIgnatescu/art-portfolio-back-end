
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: 'Diana',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          email: 'diana@gmail.com',
        },
        {
          username: 'Carmen',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          email: 'carmen@gmail.com',
        },
        {
          username: 'Louis',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          email: 'Louis@gmail.com',
        },
        {
          username: 'John',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          email: 'john@gmail.com',
        },
        {
          username: 'Elliot',
          password: '$2a$10$vBEEx72D56pUbuzQ0ne5VeeHzkhpi/i7YzVsKOP/N5OAoFSGN7ifi',
          email: 'elliot@gmail.com',
        },
      ]);
    });
};
