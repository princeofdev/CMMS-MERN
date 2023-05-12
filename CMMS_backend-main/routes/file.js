const express = require('express');
const router = express.Router();
const fileController = require('../app/api/controllers/file');

router.get('/', fileController.getAll);
router.post('/', fileController.create);
router.post('/upload', fileController.upload);
router.post('/uploadMail', fileController.uploadForMail);
router.post('/blank', fileController.blank);
router.get('/:fileId', fileController.getById);
router.get('/workOrder/:Id', fileController.getByFilterId);
router.get('/asset/:Id', fileController.getByAssetId);
router.get('/purchaseOrder/:Id', fileController.getByPurchaseId);
router.get('/creditCard/:Id', fileController.getByCreditCardId);
router.get('/rfq/:Id', fileController.getByRfqId);
router.put('/:fileId', fileController.updateById);
router.delete('/:fileId', fileController.deleteById);

module.exports = router;