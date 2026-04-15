const { Card } = require('../models');

exports.createCard = async (req, res) => {
  try {
    const { task, listId } = req.body;

    const card = await Card.create({
      task,
      listId,
      pos: 0
    });

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    await Card.update({ task }, { where: { id } });

    res.json({ message: 'updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    await Card.destroy({ where: { id } });

    res.json({ message: 'deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};