const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../common/authUtils');
const { LOCALES } = require('../constants/responseMessage');
const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userInfo = await userModel.findOne({
    email,
  });
  if (!bcrypt.compareSync(password, userInfo.password)) {
    return res.status(400).json({
      message: LOCALES.CAN_NOT_LOG_IN,
    });
  }
  const accessToken = generateAccessToken(userInfo);
  return res.json({
    message: LOCALES.LOG_IN_SUCCESS,
    token: accessToken,
    userInfo,
  });
};

const loginByToken = async (req, res, next) => {
  const { id, role } = req.user;
  const userInfo = await userModel.findOne({
    id,
  });
  return res.status(200).json({
    message: LOCALES.LOG_IN_SUCCESS,
    adminInfo: userInfo,
    userInfo,
  });
};

const getUserByRole = async (req, res, next) => {
  const { role } = req.user;
  let listUser = [];
  if (role === 'admin') {
    listUser = await userModel
      .findAll()
      .then((allUser) => allUser.filter((user) => user.role != 'admin'));
  }
  if (role === 'student') {
    listUser = await userModel
      .findAll()
      .then((allUser) =>
        allUser.filter(
          (user) => user.role != 'admin' && user.role != 'student',
        ),
      );
  }

  if (role === 'mentor') {
    listUser = await userModel
      .findAll()
      .then((allUser) =>
        allUser.filter((user) => user.role != 'admin' && user.role != 'mentor'),
      );
  }
  return res.json({
    message: LOCALES.GET_LIST_USER_SUCCESS,
    data: listUser,
  });
};

const createNewUser = async (req, res, next) => {
  const { email, password, role } = req.body;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  const userData = await userModel.create({
    email,
    password: hash,
    role,
  });
  return res.json({
    message: LOCALES.CREATE_USER_SUCCESS,
    data: userData,
  });
};

const updatePassword = async (req, res, next) => {
  const { newPassword, currentPassword } = req.body;
  const { id } = req.user;
  const userInfo = await userModel.findOne({
    id,
  });
  if (!bcrypt.compareSync(currentPassword, userInfo.password)) {
    return res.status(400).json({
      message: LOCALES.CAN_NOT_CHANGE_PASSWORD,
    });
  }
  const saltRounds = 10;
  const hash = bcrypt.hashSync(newPassword, saltRounds);

  await userModel.update(
    { id },
    {
      password: hash,
    },
  );

  return res.status(200).json({
    message: LOCALES.UPDATE_PASSWORD_SUCCESS,
  });
};

module.exports = {
  login,
  loginByToken,
  getUserByRole,
  createNewUser,
  updatePassword,
};
