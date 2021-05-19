const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const createNewUser = (user) => usersRepo.createUser(user);

const getUserById = (userId) => usersRepo.getUserById(userId);

const updateUserById = (userData) => usersRepo.updateUserById(userData);

const deleteUserById = async (userId) => {
  const filteredTasks = (await taskService.getAllTasks()).map(task => {
    if (task.userId === userId) {
      return {
        ...task,
        userId: null
      };
    }

    return task;
  });

  taskService.updateTasks(filteredTasks);
  const result = await usersRepo.deleteUserById(userId);
  return result;
}

module.exports = {
  getAll,
  createNewUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
