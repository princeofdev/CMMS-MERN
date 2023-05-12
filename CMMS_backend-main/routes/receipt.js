const express = require('express');
const router = express.Router();
const receiptController = require('../app/api/controllers/receipt');

 router.get('/', receiptController.getAll);
 router.post('/', receiptController.create);
 router.get('/:Id', receiptController.getById);
 router.put('/:Id', receiptController.updateById);
 router.delete('/:Id', receiptController.deleteById);

module.exports = router;