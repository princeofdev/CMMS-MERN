const express = require('express');
const router = express.Router();
const drillTypeController = require('../app/api/controllers/drilltype');

router.get('/', drillTypeController.getAll);
router.post('/', drillTypeController.create);
 router.get('/:Id', drillTypeController.getById);
 router.put('/:Id', drillTypeController.updateById);
 router.delete('/:Id', drillTypeController.deleteById);

module.exports = router;