const router = require('express').Router();
const ctrl = require('../controllers/cardController');
const fakeAuth = require('../middleware/fakeAuth');

router.use(fakeAuth);

router.post('/', ctrl.createCard);
router.get('/list/:listId', ctrl.getCards);
router.put('/:id', ctrl.updateCard);
router.delete('/:id', ctrl.deleteCard);

module.exports = router;