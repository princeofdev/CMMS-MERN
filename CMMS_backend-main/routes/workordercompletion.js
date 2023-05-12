const express = require('express');
const router = express.Router();
const workordercompletionController = require('../app/api/controllers/workordercompletion');

router.get('/', workordercompletionController.getAll);
router.get('/:workorderId', workordercompletionController.getByWorkorderId);
router.post('/', workordercompletionController.create);
router.get('/:workodercompletonId', workordercompletionController.getById);
router.get('/filter/:Id', workordercompletionController.getByFilterId);
router.put('/:Id', workordercompletionController.updateById);
router.delete('/:Id', workordercompletionController.deleteById);

module.exports = router;