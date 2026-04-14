const express = require('express');
const router = express.Router();
const { Board, List, Card } = require('../models');


router.get('/', async (req, res) => {
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
});


router.post('/', async (req, res) => {
  const { title, userId } = req.body;

  const board = await Board.create({ title, userId });
  res.json(board);
});

module.exports = router;