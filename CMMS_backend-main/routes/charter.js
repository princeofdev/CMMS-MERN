const express = require('express');
const router = express.Router();
const charterController = require('../app/api/controllers/charter');

router.get('/', charterController.getAll);
router.post('/', charterController.create);
router.get('/:Id', charterController.getById);
router.put('/:Id', charterController.updateById);
router.delete('/:Id', charterController.deleteById);

module.exports = router;