const { Board, List, Card } = require('../models');

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.findAll({
      include: {
        model: List,
        as: 'lists',
        include: {
          model: Card,
          as: 'cards'
        }
      }
    });

    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { title, userId } = req.body;

    const board = await Board.create({ title, userId });

    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};