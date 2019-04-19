
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          postName: 'Weekend trip to Paris',
          description: 'I had the most wonderful time walking along the Seine!',
          imageUrl: 'https://loremflickr.com/g/320/240/paris',
          userId: 1,
        },
        {
          postName: 'A man\'s best friend',
          description: 'I love my dog',
          imageUrl: 'https://loremflickr.com/320/240/dog',
          userId: 2,
        },
        {
          postName: 'Beautiful portrait',
          description: 'Just as beautiful as the Mona Lisa',
          imageUrl: 'https://loremflickr.com/320/240/paris,girl/all',
          userId: 3,
        },
        {
          postName: 'Morning ritual',
          description: 'There\'s nothing better than a cup of coffee in the morning',
          imageUrl: 'https://loremflickr.com/320/240/coffee',
          userId: 4,
        },
        {
          postName: 'Sunday mood',
          description: 'My favorite past time activity',
          imageUrl: 'https://loremflickr.com/320/240/sleep',
          userId: 5,
        },
        {
          postName: 'Exploring nature',
          description: 'Summer is here!',
          imageUrl: 'https://loremflickr.com/320/240/sun',
          userId: 6,
        },
        {
          postName: 'Wonderful sculpture',
          description: 'Pretty statue I found during my adventures',
          imageUrl: 'https://loremflickr.com/320/240/statue',
          userId: 1,
        },
        {
          postName: 'People watching',
          description: 'I like taking pictures of people',
          imageUrl: 'https://loremflickr.com/320/240/man',
          userId: 2,
        },
        {
          postName: 'My Birthday',
          description: 'Happy Birthday to me!',
          imageUrl: 'https://loremflickr.com/320/240/cake',
          userId: 1,
        },
        {
          postName: 'Outfit of the day',
          description: 'Fashion is my passion',
          imageUrl: 'https://loremflickr.com/320/240/fashion',
          userId: 4,
        },
      ]);
    });
};
