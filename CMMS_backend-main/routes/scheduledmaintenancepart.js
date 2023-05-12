const express = require('express');
const router = express.Router();
const scheduledmaintenancepartController = require('../app/api/controllers/scheduledmaintenancepart');

router.get('/', scheduledmaintenancepartController.getAll);
router.post('/', scheduledmaintenancepartController.create);
 router.get('/:Id', scheduledmaintenancepartController.getById);
 router.put('/:Id', scheduledmaintenancepartController.updateById);
 router.delete('/:Id', scheduledmaintenancepartController.deleteById);

module.exports = router;