const express = require('express');
const router = express.Router();
const scheduledmaintenanceassetController = require('../app/api/controllers/scheduledmaintenanceasset');

router.get('/', scheduledmaintenanceassetController.getAll);
router.post('/', scheduledmaintenanceassetController.create);
 router.get('/:Id', scheduledmaintenanceassetController.getById);
 router.put('/:Id', scheduledmaintenanceassetController.updateById);
 router.delete('/:Id', scheduledmaintenanceassetController.deleteById);

module.exports = router;