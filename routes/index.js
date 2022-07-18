const express = require('express');
const router = express.Router();
const joi = require('joi');
const authenticateToken = require('../middleware/authenticateToken');
const authorize = require('../middleware/authorize');
const { validateRequestData } = require('../middleware/validateRequestData');
const UserController = require('../controllers/user.controller');
router
  .route('/')
  .get((req, res) => res.status(200).json({ message: 'Server is running' }));

router.post(
  '/login',
  validateRequestData({
    bodySchema: joi.object({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  }),
  UserController.login,
);
router.post('/login-by-token', authenticateToken, UserController.loginByToken);

router.get('/users', authenticateToken, UserController.getUserByRole);
router.post(
  '/users',
  authenticateToken,
  authorize(['admin']),
  UserController.createNewUser,
);
router.put(
  '/password',
  authenticateToken,
  validateRequestData({
    bodySchema: joi.object({
      newPassword: joi.string().min(6).required(),
      currentPassword: joi.string().min(6).required(),
    }),
    validateOptions: {
      allowUnknown: false,
      abortEarly: false,
    },
  }),
  UserController.updatePassword,
);
module.exports = router;
