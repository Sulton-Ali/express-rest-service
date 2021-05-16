const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const createNewUser = (user) => usersRepo.createUser(user);

const getUserById = (userId) => usersRepo.getUserById(userId);

const updateUserById = (userData) => usersRepo.updateUserById(userData);

const deleteUserById = (userId) => usersRepo.deleteUserById(userId);

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
