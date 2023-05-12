const express = require('express');
const router = express.Router();
const rfqslineitemController = require('../app/api/controllers/rfqslineitem');

// router.get('/', rfqslineitemController.getAll);
router.get('/rfqsid/:Id', rfqslineitemController.getAllByRFQId);
router.post('/', rfqslineitemController.create);
router.get('/lineItem/:Id', rfqslineitemController.getById);
router.put('/:Id', rfqslineitemController.updateById);
router.delete('/:Id', rfqslineitemController.deleteById);

module.exports = router;