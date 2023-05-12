const express = require('express');
const router = express.Router();
const auditReportController = require('../app/api/controllers/auditreport');

router.get('/', auditReportController.getAll);
router.post('/', auditReportController.create);
router.get('/:Id', auditReportController.getById);
router.put('/:Id', auditReportController.updateById);
router.delete('/:Id', auditReportController.deleteById);

module.exports = router;