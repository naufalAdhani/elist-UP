const router = require('express').Router();
const ctrl = require('../controllers/boardController');
const fakeAuth = require('../middleware/fakeAuth');

router.use(fakeAuth);

router.post('/', ctrl.createBoard);
router.get('/', ctrl.getBoards);
router.get('/:id', ctrl.getBoardById);
router.get('/:id/detail', ctrl.getBoardDetail);
router.put('/:id', ctrl.updateBoard);
router.delete('/:id', ctrl.deleteBoard);

module.exports = router;