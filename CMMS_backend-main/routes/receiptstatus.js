const express = require('express');
const router = express.Router();
const receiptstatusController = require('../app/api/controllers/receiptstatus');

 router.get('/', receiptstatusController.getAll);
 router.post('/', receiptstatusController.create);
 router.get('/:Id', receiptstatusController.getById);
 router.put('/:Id', receiptstatusController.updateById);
 router.delete('/:Id', receiptstatusController.deleteById);

module.exports = router;