const { List } = require('../models');

// CREATE
exports.createList = async (req, res) => {
  try {
    const { name, boardId } = req.body;

    if (!name || !boardId) {
      return res.status(400).json({ message: 'Name and boardId are required' });
    }

    const list = await List.create({
      name,
      boardId,
      pos: req.body.pos || 0
    });

    res.status(201).json({
      message: 'List created',
      data: list
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET BY BOARD
exports.getLists = async (req, res) => {
  try {
    const lists = await List.findAll({
      where: { boardId: req.params.boardId },
      order: [['pos', 'ASC']]
    });

    res.status(200).json({
      message: 'Success',
      data: lists
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE
exports.updateList = async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    await list.update({
      name: req.body.name ?? list.name,
      pos: req.body.pos ?? list.pos
    });

    res.status(200).json({
      message: 'List updated',
      data: list
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE
exports.deleteList = async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    await list.destroy();

    res.status(200).json({
      message: 'List deleted'
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};