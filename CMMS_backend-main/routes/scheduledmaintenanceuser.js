const express = require('express');
const router = express.Router();
const scheduledmaintenanceuserController = require('../app/api/controllers/scheduledmaintenanceuser');

router.get('/', scheduledmaintenanceuserController.getAll);
router.post('/', scheduledmaintenanceuserController.create);
 router.get('/:Id', scheduledmaintenanceuserController.getById);
 router.put('/:Id', scheduledmaintenanceuserController.updateById);
 router.delete('/:Id', scheduledmaintenanceuserController.deleteById);

module.exports = router;