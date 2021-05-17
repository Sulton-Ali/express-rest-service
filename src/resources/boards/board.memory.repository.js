// const Board = require('./board.model');

const BOARDS = [];

const getAllBoards = async () => BOARDS;

const addNewBoard = async (newBoard) => BOARDS.push(newBoard);

const getBoardById = async (boardId) => {
  const board = BOARDS.find((item) => item.id === boardId);
  return board;
}

module.exports = {
  getAllBoards,
  addNewBoard,
  getBoardById
}