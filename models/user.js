const createModel = require('../helpers/model_helper');
const knex = require('../knex/knex');

const MODEL_NAME = 'User';
const TABLE_NAME = 'User';

const selectableProps = ['*'];

const User = (knex) => {
  const model = createModel({
    knex,
    name: MODEL_NAME,
    tableName: TABLE_NAME,
    selectableProps,
  });

  return {
    ...model,
  };
};

module.exports = User(knex);
