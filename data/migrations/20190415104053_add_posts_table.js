
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
    tbl.increments();
    tbl
        .string('postName', 255)
        .notNullable();
    tbl
        .string('description', 255);
    tbl
        .string('imageUrl', 255)
        .notNullable();
    tbl
        .integer('upvotes');
    tbl
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
