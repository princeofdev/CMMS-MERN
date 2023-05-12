const express = require('express');
const router = express.Router();
const stockController = require('../app/api/controllers/stock');

router.get('/assetId/:Id', stockController.getAll);
router.post('/', stockController.create);
router.get('/id/:Id', stockController.getById);
router.put('/:Id', stockController.updateById);
router.delete('/:Id', stockController.deleteById);

module.exports = router;