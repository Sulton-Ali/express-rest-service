// const Board = require('./board.model');

let BOARDS = [];

const getAllBoards = async () => BOARDS;

const addNewBoard = async (newBoard) => BOARDS.push(newBoard);

const getBoardById = async (boardId) => {
  const board = BOARDS.find((item) => item.id === boardId);
  return board;
}

const updateBoardById = async (newBoard) => {
  let boardFinded = false;

  const boards = BOARDS.map((board) => {
    if (board.id === newBoard.id) {
      boardFinded = true;
      return newBoard;
    }

    return board;
  });

  BOARDS = boards;

  return boardFinded ? newBoard : boardFinded;
}

const deleteBoardById = async (boardId) => {
  let boardFinded = false;

  const boards = BOARDS.filter(board => {
    if (board.id === boardId) {
      boardFinded = true;
      return false;
    }
    return true;
  });
  BOARDS = boards;
  return boardFinded;
}

module.exports = {
  getAllBoards,
  addNewBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById
}