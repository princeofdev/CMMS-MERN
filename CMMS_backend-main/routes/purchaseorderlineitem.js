const express = require('express');
const router = express.Router();
const purchaseorderlineitemController = require('../app/api/controllers/purchaseorderlineitem');

router.get('/', purchaseorderlineitemController.getAll);
router.get('/poid/:Id', purchaseorderlineitemController.getAllByPOID);
router.get('/poid/', purchaseorderlineitemController.getAllFromBoard);
router.post('/', purchaseorderlineitemController.create);
router.get('/lineItem/:Id', purchaseorderlineitemController.getById);
router.put('/:Id', purchaseorderlineitemController.updateById);
router.delete('/:Id', purchaseorderlineitemController.deleteById);

module.exports = router;