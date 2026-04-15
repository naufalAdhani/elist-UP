const { Board, List, Card } = require('../models');

// CREATE
exports.createBoard = async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const board = await Board.create({
      title: req.body.title,
      userId: req.user.id
    });

    res.status(201).json({
      message: 'Board created',
      data: board
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET ALL
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      where: { userId: req.user.id }
    });

    res.status(200).json({
      message: 'Success',
      data: boards
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET BY ID
exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    res.status(200).json({
      message: 'Success',
      data: board
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET BOARD DETAIL
exports.getBoardDetail = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    const list = await Board.findByPk(req.params.id);
    const card = await Board.findByPk(req.params.id);

    if (!board) {
      return res.status(404).json({message: 'Board not found'});
    }

    res.status(200).json({
      message: 'Success',
      data: [board, list, card]
    })
  }

  catch (err) {
    res.status(500).json({message: "internal server error"})
  }
}

// UPDATE
exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    await board.update({
      title: req.body.title ?? board.title
    });

    res.status(200).json({
      message: 'Board updated',
      data: board
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE
exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);

    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    await board.destroy();

    res.status(200).json({
      message: 'Board deleted'
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};