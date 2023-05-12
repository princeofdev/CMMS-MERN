const express = require('express');
const router = express.Router();
const businessbranchController = require('../app/api/controllers/businessbranch');

router.get('/:businessId', businessbranchController.getAll);
router.post('/', businessbranchController.create);
// router.get('/:businessgroupId', businessbranchController.getById);
router.put('/:Id', businessbranchController.updateById); //business branch id
router.delete('/:Id', businessbranchController.deleteById);

module.exports = router;