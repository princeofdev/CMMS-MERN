const express = require('express');
const router = express.Router();
const stockhistoryController = require('../app/api/controllers/stockhistory');

router.get('/', stockhistoryController.getAll);
router.post('/', stockhistoryController.create);
router.get('/:Id', stockhistoryController.getById);
router.put('/:Id', stockhistoryController.updateById);
router.delete('/:Id', stockhistoryController.deleteById);

module.exports = router;