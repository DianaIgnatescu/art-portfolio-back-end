
exports.up = function (knex, Promise) {
  return knex.schema.createTable('likes', (tbl) => {
    tbl.increments();
    tbl
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('postId')
      .unsigned()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('likes');
};
