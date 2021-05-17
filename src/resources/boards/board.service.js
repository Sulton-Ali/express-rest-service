const boardRepo = require('./board.memory.repository');

const getAllBoard = () => boardRepo.getAllBoards();

module.exports = {
  getAllBoard
}