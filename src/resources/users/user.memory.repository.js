const User = require('./user.model');

let USERS = [];

const getAll = async () => USERS;

const createUser = async (user) => {
  const newUser = new User(user);
  USERS.push(newUser);
  return newUser;
};

const getUserById = async (userId) => {
  const searchedUser = USERS.find((user) => user.id === userId);
  return searchedUser;
};

const updateUserById = async (userData) => {
  let userFinded = false;

  const newUsers = USERS.map((user) => {
    if (user.id === userData.userId) {
      userFinded = true;
      return {
        id: userData.userId,
        name: userData.name,
        login: userData.login,
        password: userData.password,
      };
    }

    return user;
  });

  if (userFinded) {
    USERS = newUsers;
    return {
      id: userData.userId,
      name: userData.name,
      login: userData.login,
      password: userData.password,
    };
  }

  return undefined;
};

const deleteUserById = async (userId) => {
  let userFinded = false;

  const newUsers = [];
  USERS.forEach((user) => {
    if (user.id === userId) {
      userFinded = true;
    } else {
      newUsers.push(user)
    }
  });

  if (userFinded) {
    USERS = newUsers;
  }

  return userFinded;
};

module.exports = {
  getAll,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
