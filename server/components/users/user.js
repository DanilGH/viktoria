const createGuts = require('../../libraries/helpers/model')

const name = 'User';
const tableName = 'users';

const selectableProps = [
  'id',
  'firstname',
  'middlename',
  'lastname',
  'phone',
  'created_at',
  'updated_at'
];

module.exports = knex => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps
  });

  const update = (id, props) => {
    props.updated_at = knex.fn.now();
    return guts.update(id, props)
  }

  return {
    ...guts,
    update
  };
}