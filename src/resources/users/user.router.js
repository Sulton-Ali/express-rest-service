const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

// Get method /users - get all users
router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(users.map(User.toResponse));
});

// Post method: /users - create new user
router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;

  const user = { name, login, password };

  const newUser = await usersService.createNewUser(user);

  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(User.toResponse(newUser));
});

// Get method /users/{userId} - get user by id
router.route('/:userId').get(async (req, res) => {
  const { userId } = req.params;

  const user = await usersService.getUserById(userId);

  if (user) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(User.toResponse(user));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ message: 'User with such id not found' });
  }
});

// Put method /users/{userId} - update user by id
router.route('/:userId').put(async (req, res) => {
  const { userId } = req.params;

  const { name, login, password } = req.body;

  if (
    typeof userId !== 'string' ||
    typeof name !== 'string' ||
    typeof login !== 'string' ||
    typeof password !== 'string'
  ) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('Body of request filled incorrect!');
    return;
  }

  const user = {
    userId,
    name,
    login,
    password,
  }
  const updatedUser = await usersService.updateUserById(user);
  
  if (updatedUser) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(User.toResponse(updatedUser));
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ message: 'User with such id not found' });
  }
});

// Delete method /users/{userId} - delete user by id
router.route('/:userId').delete(async (req, res) => {
  const { userId } = req.params;

  const userDeleted = await usersService.deleteUserById(userId);
  
  if (userDeleted) {
    res.status(204).end("User has been deleted");
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).json({ message: 'User with such id not found' });
  }
});

module.exports = router;
