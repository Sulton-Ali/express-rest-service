const taskRepo = require('./task.memory.repository');

const getAllTasks = () => taskRepo.getAllTasks();

const updateTasks = (tasks) => taskRepo.updateTasks(tasks);

const getAllTasksByBoardId = (boardId) => taskRepo.getAllTasksByBoardId(boardId);

const createNewTask = (newTask) => taskRepo.addNewTask(newTask);

const getTaskById = (boardId, taskId) => taskRepo.getTaskById(boardId, taskId);

const updateTaskById = (task, boardId) => taskRepo.updateTaskById(task, boardId);

const deleteTaskById = (task, boardId) => taskRepo.deleteTaskById(task, boardId);

module.exports = {
    getAllTasks,
    updateTasks,
    getAllTasksByBoardId,
    createNewTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}