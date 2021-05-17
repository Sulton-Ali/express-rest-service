const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');
const Column = require('../columns/column.model');

const getAllBoard = () => boardRepo.getAllBoards();

const createNewBoard = async (title, columns) => {
  const boardColumns = columns.map((column) => new Column(column));
  const newBoard = new Board({title, columns: boardColumns});
  await boardRepo.addNewBoard(newBoard)
  return newBoard;
};

const getBoardById = (boardId) => boardRepo.getBoardById(boardId);

module.exports = {
  getAllBoard,
  createNewBoard,
  getBoardById
}