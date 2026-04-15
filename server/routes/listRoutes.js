const router = require('express').Router();
const ctrl = require('../controllers/listController');
const fakeAuth = require('../middleware/fakeAuth');

router.use(fakeAuth);

router.post('/', ctrl.createList);
router.get('/board/:boardId', ctrl.getLists);
router.put('/:id', ctrl.updateList);
router.delete('/:id', ctrl.deleteList);

module.exports = router;