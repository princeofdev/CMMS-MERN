const express = require('express');
const router = express.Router();
const purchaseOrderNotificationController = require('../app/api/controllers/purchaseordernotification');

router.get('/filter/:id', purchaseOrderNotificationController.getAll);
router.post('/', purchaseOrderNotificationController.create);
// router.get('/:id', purchaseOrderNotificationController.getById);
// router.get('/filter/:Id', purchaseOrderNotificationController.getByFilterId);
router.put('/:id', purchaseOrderNotificationController.updateById);
router.delete('/:id', purchaseOrderNotificationController.deleteById);

module.exports = router;