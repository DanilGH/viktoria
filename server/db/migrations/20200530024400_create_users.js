exports.up = function (knex) {
  return knex.schema.createTable('users', t => {
    t.increments('id').primary().unsigned()
    t.string('firstname')
    t.string('middlename')
    t.string('lastname')
    t.string('phone').unique().index()
    t.timestamp('created_at').defaultTo(knex.fn.now())
    t.timestamp('updated_at').defaultTo(knex.fn.now())
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('users')
};
