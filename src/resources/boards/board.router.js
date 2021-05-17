const router = require('express').Router();
// const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAllBoard();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(boards);
});

module.exports = router;
