const router = require('express').Router();
const card = require('../controllers/cardController');

router.post('/', card.createCard);
router.put('/:id', card.updateCard);
router.delete('/:id', card.deleteCard);

module.exports = router;