const express = require('express');
const router = express.Router();
const purchaseorderController = require('../app/api/controllers/purchaseorder');

router.get('/', purchaseorderController.getAll);
router.post('/', purchaseorderController.create);
router.post('/sendmail', purchaseorderController.sendMail);
router.get('/:Id', purchaseorderController.getById);
router.put('/:Id', purchaseorderController.updateById);
router.delete('/:Id', purchaseorderController.deleteById);
router.get('/print/:Id', purchaseorderController.getPrintDataAll);

module.exports = router;