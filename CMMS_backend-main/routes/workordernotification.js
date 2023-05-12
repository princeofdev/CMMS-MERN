const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/workordernotification');

router.get('/', Controller.getAll);
router.post('/', Controller.create);
router.get('/workorder/:Id', Controller.getById);
router.put('/:Id', Controller.updateById);
router.delete('/:Id', Controller.deleteById);

module.exports = router;