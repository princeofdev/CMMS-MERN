const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/additionalcost');

router.get('/purchaseorder/:Id', Controller.getAll);
router.post('/', Controller.create);
router.get('/single/:Id', Controller.getById);
router.put('/:Id', Controller.updateById);
router.delete('/:Id', Controller.deleteById);

module.exports = router;