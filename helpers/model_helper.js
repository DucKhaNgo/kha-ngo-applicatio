module.exports = ({
  knex = {},
  name,
  tableName,
  selectableProps = [],
  timeout = 4000,
}) => {
  const create = (props) => {
    return knex
      .insert(props)
      .into(tableName)
      .timeout(timeout)
      .then((row) => row[0]);
  };

  const findAll = () =>
    knex.select(selectableProps).from(tableName).timeout(timeout);

  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout)
      .then((row) => row);

  // Same as `find` but only returns the first match if >1 are found.
  // TODO: optimize this findOne with limit(1)
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;
      return results[0];
    });

  const findById = (id) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where({ id })
      .first()
      .timeout(timeout);

  const update = (filters, props) => {
    return knex
      .update(props)
      .from(tableName)
      .where(filters)
      .timeout(timeout)
      .then((row) => row);
  };

  const destroy = (filters) =>
    knex.del().from(tableName).where(filters).timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    find,
    findOne,
    findById,
    update,
    destroy,
  };
};
