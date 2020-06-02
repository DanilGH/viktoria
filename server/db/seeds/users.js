const faker = require('faker');
const {range} = require('../../libraries/helpers/array');

exports.seed = function (knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert(
        range(200).map(i => {
          return {
            'firstname': faker.name.firstName(),
            'middlename': faker.name.firstName(),
            'lastname': faker.name.lastName(),
            'phone': faker.phone.phoneNumber('+79#########')
          }
        })
      );
    });
};
