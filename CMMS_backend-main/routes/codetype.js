const express = require('express');
const router = express.Router();
const codeTypeController = require('../app/api/controllers/codetype');

router.get('/', codeTypeController.getAll);
router.post('/', codeTypeController.create);
 router.get('/:Id', codeTypeController.getById);
 router.put('/:Id', codeTypeController.updateById);
 router.delete('/:Id', codeTypeController.deleteById);

module.exports = router;