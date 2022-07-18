const { get } = require('lodash');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const { jwtSecret } = require('../config');

/**
 *
 * @param {Object} client client data to generate token
 * @param {Object} param1
 * @param {String} [param1.expire = '1d'] expired day
 * @returns {String} token
 */
const generateAccessToken = (client, { expire = '1d' } = {}) => {
  const userRole = get(client, 'role');

  return jwt.sign({ ...client, role: userRole }, jwtSecret, {
    expiresIn: expire,
  });
};

/**
 * handle generate token and registerNewUser
 * @param {Object} client client data to generate token
 * @param {Object} param1
 * @param {String} [param1.expire = '1d'] expire time by jwt format
 */
const generateAccessTokenAndRegisterNewUser = (
  client,
  { expire = '1d' } = {},
) => {
  const userRole = get(client, 'role', ROLE.USER);
  const userId = get(client, 'id');

  const joiSchema = joi.object({
    id: joi.alternatives().try(joi.number(), joi.string()).required(),
    role: joi
      .string()
      .valid(ROLE.STORE, ROLE.USER, ROLE.ADMIN, ROLE.SUPER_ADMIN)
      .required(),
  });

  const { error } = joiSchema.validate({ id: userId, role: userRole });
  if (error) throw new Error(error.message);
  const token = generateAccessToken(client, { expire });
  setActiveUser({ role: userRole, id: userId, token });
  return token;
};
const getTokenFromReq = (req) => {
  const authHeader = req.headers['authorization'];
  // FIX: should validate schema of token as well. In our case: Bearer
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

module.exports = {
  generateAccessToken,
  generateAccessTokenAndRegisterNewUser,
  getTokenFromReq
};
