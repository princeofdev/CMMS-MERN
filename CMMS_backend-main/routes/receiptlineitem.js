const express = require('express');
const router = express.Router();
const receiptlineitemController = require('../app/api/controllers/receiptlineitem');

 router.get('/', receiptlineitemController.getAll);
 router.post('/', receiptlineitemController.create);
 router.get('/:Id', receiptlineitemController.getById);
 router.put('/:Id', receiptlineitemController.updateById);
 router.delete('/:Id', receiptlineitemController.deleteById);

module.exports = router;