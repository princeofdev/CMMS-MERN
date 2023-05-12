const express = require('express');
const router = express.Router();
const stockcyclecountController = require('../app/api/controllers/stockcyclecount');

router.get('/', stockcyclecountController.getAll);
router.post('/', stockcyclecountController.create);
router.get('/:Id', stockcyclecountController.getById);
router.put('/:Id', stockcyclecountController.updateById);
router.delete('/:Id', stockcyclecountController.deleteById);

module.exports = router;