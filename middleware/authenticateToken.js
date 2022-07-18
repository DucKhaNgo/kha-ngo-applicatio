const { jwtSecret } = require('../config');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // FIX: should validate schema of token as well. In our case: Bearer
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.status(401).json({ message: 'Auth fail: no token!' });

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err)
      return res.status(403).json({
        message: 'Auth fail: You not have permission to visit request this api',
      });
    req.user = user;
    next();
  });
};
