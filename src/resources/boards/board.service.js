const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/column.model');
const taskService = require('../tasks/task.service');

const getAllBoard = () => boardRepo.getAllBoards();

const createNewBoard = async (title, columns) => {
  const boardColumns = columns.map((column) => new Column(column));
  const newBoard = new Board({title, columns: boardColumns});
  await boardRepo.addNewBoard(newBoard)
  return newBoard;
};

const getBoardById = (boardId) => boardRepo.getBoardById(boardId);

const updateBoardById = (newBoard) => boardRepo.updateBoardById(newBoard);

const deleteBoardById = async (boardId) => {
  const filteredTasks = (await taskService.getAllTasks()).filter(task => {
    if (task.boardId === boardId) {
      return false;
    }
    return true;
  });

  taskService.updateTasks(filteredTasks);

  const result = await boardRepo.deleteBoardById(boardId);
  return result;
}

module.exports = {
  getAllBoard,
  createNewBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
}