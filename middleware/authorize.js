const { get } = require('lodash');
const { getTokenFromReq } = require('../common/authUtils');
/**
 * Authorize roles of user
 * @param {array} roles : values of ROLE in file constants/role
 */

const authorize =
  (roles = []) =>
  (req, res, next) => {
    try {
      const userRole = get(req, 'user.role');
      if (!roles.includes(userRole))
        return res.status(403).json({
          message:
            'Auth fail: You not have permission to visit request this api',
        });

      next();
    } catch (error) {
      return res.sendStatus(500);
    }
  };

module.exports = authorize;
