const Task = require('./task.model');

let TASKS = [];

const getAllTasks = async () => TASKS;

const updateTasks = async (tasks) => {
	TASKS = tasks;
}

const getAllTasksByBoardId = async (boardId) => {
  const tasks = TASKS.filter((task) => task.boardId === boardId);
  return tasks;
};

const addNewTask = async (newTask) => {
  const task = new Task(newTask);
  TASKS.push(task);
  return task;
};

const getTaskById = (boardId, taskId) => {
  const searchedTask = TASKS.find(
    (task) => task.id === taskId && task.boardId === boardId
  );
  return searchedTask;
};

const updateTaskById = async (task, boardId) => {
  let taskFinded = false;
  const tasks = TASKS.map((taskItem) => {
    if (taskItem.id === task.id && taskItem.boardId === boardId) {
      taskFinded = true;
      return task;
    }
    return taskItem;
  });

  TASKS = tasks;
  return taskFinded ? task : taskFinded;
};

const deleteTaskById = async (boardId, taskId) => {
  let taskFinded = false;
  const tasks = TASKS.filter((task) => {
    if (task.id === taskId && task.boardId === boardId) {
      taskFinded = true;
      return false;
    }
    return true;
  });
  TASKS = tasks;
  return taskFinded;
};

module.exports = {
	getAllTasks,
	updateTasks,
  getAllTasksByBoardId,
  addNewTask,
  getTaskById,
  updateTaskById,
  deleteTaskById,
};
