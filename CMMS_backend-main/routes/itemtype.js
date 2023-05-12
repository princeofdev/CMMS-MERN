const express = require('express');
const router = express.Router();
const itemTypeController = require('../app/api/controllers/itemtype');

router.get('/', itemTypeController.getAll);
router.post('/', itemTypeController.create);
 router.get('/:Id', itemTypeController.getById);
 router.put('/:Id', itemTypeController.updateById);
 router.delete('/:Id', itemTypeController.deleteById);

module.exports = router;