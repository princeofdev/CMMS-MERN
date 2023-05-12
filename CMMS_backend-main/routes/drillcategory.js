const express = require('express');
const router = express.Router();
const drillCategoryController = require('../app/api/controllers/drillcategory');

router.get('/', drillCategoryController.getAll);
router.post('/', drillCategoryController.create);
 router.get('/:Id', drillCategoryController.getById);
 router.put('/:Id', drillCategoryController.updateById);
 router.delete('/:Id', drillCategoryController.deleteById);

module.exports = router;