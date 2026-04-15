const { List } = require('../models');

exports.createList = async (req, res) => {
  try {
    const { name, boardId } = req.body;

    const list = await List.create({
      name,
      boardId,
      pos: 0
    });

    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};