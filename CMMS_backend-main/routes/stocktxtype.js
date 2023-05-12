const express = require('express');
const router = express.Router();
const stocktxtypeController = require('../app/api/controllers/stocktxtype');

router.get('/', stocktxtypeController.getAll);
router.post('/', stocktxtypeController.create);
router.get('/:Id', stocktxtypeController.getById);
router.put('/:Id', stocktxtypeController.updateById);
router.delete('/:Id', stocktxtypeController.deleteById);

module.exports = router;