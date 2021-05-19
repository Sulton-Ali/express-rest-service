const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;

  const allTasks = await taskService.getAllTasksByBoardId(boardId);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(allTasks.map(Task.toResponse));
});

router.route('/').post(async (req, res) => {
  // const { boardId } = req.params;

  const { title, order, description, userId, boardId, columnId } = req.body;

  if (typeof boardId !== 'string') {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ message: 'Body of request filled incorrect!' });
    return;
  }

  const newTask = await taskService.createNewTask({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });

  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(Task.toResponse(newTask));
});

router.route('/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;

  const task = await taskService.getTaskById(boardId, taskId);
  
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  const { boardId: boardIdOld, taskId } = req.params;

  const { title, order, description, userId, boardId, columnId } = req.body;

  if (typeof taskId !== 'string' || typeof boardId !== 'string') {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json({ message: 'Body of request filled incorrect!' });
    return;
  }

  const updatedTask = await taskService.updateTaskById(
    {
      id: taskId,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    },
    boardIdOld
  );

  res.setHeader('Content-Type', 'application/json');
  if (updatedTask) {
    res.status(200).json(Task.toResponse(updatedTask));
  } else {
    res.status(404).json({ message: 'Task not found!' });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;

  const isDeleted = await taskService.deleteTaskById(boardId, taskId);

  res.setHeader('Content-Type', 'application/json');
  if (isDeleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Task not found!' });
  }
});

module.exports = router;
