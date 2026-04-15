const { Card } = require('../models');

// CREATE
exports.createCard = async (req, res) => {
  try {
    const { task, listId } = req.body;

    if (!task || !listId) {
      return res.status(400).json({ message: 'Task and listId are required' });
    }

    const card = await Card.create({
      task,
      listId,
      pos: req.body.pos || 0
    });

    res.status(201).json({
      message: 'Card created',
      data: card
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET BY LIST
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({
      where: { listId: req.params.listId },
      order: [['pos', 'ASC']]
    });

    res.status(200).json({
      message: 'Success',
      data: cards
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await card.update({
      task: req.body.task ?? card.task,
      pos: req.body.pos ?? card.pos
    });

    res.status(200).json({
      message: 'Card updated',
      data: card
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    await card.destroy();

    res.status(200).json({
      message: 'Card deleted'
    });

  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};