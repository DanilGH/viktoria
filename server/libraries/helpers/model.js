module.exports = (
  {
    knex = {},
    name = 'name',
    tableName = 'tablename',
    selectableProps = [],
    timeout = 1000
  }
) => {
  const create = props => {
    delete props.id;

    return knex.insert(props)
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  }

  const findAll = (limit, offset) => knex.select(selectableProps)
    .from(tableName)
    .orderBy('created_at', 'desc')
    .offset(offset)
    .limit(limit)
    .timeout(timeout);

  const countAll = () => knex
    .from(tableName)
    .count()
    .first()
    .timeout(timeout);

  const find = filters => knex.select(selectableProps)
    .from(tableName)
    .where(filters)
    .timeout(timeout);

  const findOne = filters => find(filters)
    .then(results => {
      if (!Array.isArray(results)) return results

      return results[0]
    });

  const findById = id => knex.select(selectableProps)
    .from(tableName)
    .where({id})
    .timeout(timeout);

  const update = (id, props) => {
    delete props.id;

    return knex.update(props)
      .from(tableName)
      .where({id})
      .returning(selectableProps)
      .timeout(timeout);
  }

  const destroy = id => knex.del()
    .from(tableName)
    .where({id})
    .timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    countAll,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy
  }
}