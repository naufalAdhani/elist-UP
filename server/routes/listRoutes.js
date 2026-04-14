const router = require('express').Router();
const list = require('../controllers/listController');

router.post('/', list.createList);

module.exports = router;