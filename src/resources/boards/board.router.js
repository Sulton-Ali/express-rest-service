const router = require('express').Router();
const boardService = require('./board.service');

// Get method /boards - get all boards
router.route('/').get(async (req, res) => {
  const boards = await boardService.getAllBoard();

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(boards);
});

// Post method /boards - create new board
router.route('/').post(async (req, res) => {
  const {
    title,
    columns
  } = req.body;

  if (typeof title !== 'string' || !Array.isArray(columns)) {
    res.status(400).json({message: 'Fields filled incorrect!'});
  }

  const newBoard = await boardService.createNewBoard(title, columns);
  res.setHeader('Content-Type', 'application/json');
  res.status(201).json(newBoard);

});

// Get method /boards/:boardId - get board by id
router.route('/:boardId').get(async (req, res) => {
  const { boardId } = req.params;

  const board = await boardService.getBoardById(boardId);

  res.setHeader('Content-Type', 'application/json');
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
});

router.route('/:boardId').put(async (req, res) => {
  const { boardId } = req.params;

  const { title, columns } = req.body;

  if ( !boardId || !Array.isArray(columns) ) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).json('Body of request filled incorrect!');
    return;
  }

  const updatedBoard = await boardService.updateBoardById({ id: boardId, title, columns });
  res.setHeader('Content-Type', 'application/json');
  if (updatedBoard) {
    res.status(200).json(updatedBoard);
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  const { boardId } = req.params;

  const isDeleted = await boardService.deleteBoardById(boardId);
  res.setHeader('Content-Type', 'application/json');
  if (isDeleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Board not found' });
  }
});


module.exports = router;
