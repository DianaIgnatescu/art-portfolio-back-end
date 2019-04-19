
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('likes').del()
    .then(function () {
      // Inserts seed entries
      return knex('likes').insert([
        {
          userId: 1,
          postId: 2,
        },
        {
          userId: 4,
          postId: 1,
        },
        {
          userId: 1,
          postId: 3,
        },
        {
          userId: 2,
          postId: 6,
        },
        {
          userId: 2,
          postId: 4,
        },
        {
          userId: 1,
          postId: 5,
        },
        {
          userId: 4,
          postId: 2,
        },
        {
          userId: 5,
          postId: 1,
        },
        {
          userId: 4,
          postId: 5,
        },
        {
          userId: 1,
          postId: 6,
        },
      ]);
    });
};
