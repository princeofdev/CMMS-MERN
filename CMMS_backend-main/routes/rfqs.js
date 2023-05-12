const express = require('express');
const router = express.Router();
const rfqsController = require('../app/api/controllers/rfqs');

router.get('/', rfqsController.getAll);
router.post('/', rfqsController.create);
router.get('/:Id', rfqsController.getById);
router.put('/:Id', rfqsController.updateById);
router.delete('/:Id', rfqsController.deleteById);

module.exports = router;