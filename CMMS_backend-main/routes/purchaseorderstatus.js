const express = require('express');
const router = express.Router();
const purchaseorderstatusController = require('../app/api/controllers/purchaseorderstatus');

router.get('/', purchaseorderstatusController.getAll);
router.post('/', purchaseorderstatusController.create);
router.get('/:Id', purchaseorderstatusController.getById);
router.put('/:Id', purchaseorderstatusController.updateById);
router.delete('/:Id', purchaseorderstatusController.deleteById);

module.exports = router;