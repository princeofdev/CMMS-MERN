const express = require('express');
const router = express.Router();
const workorderController = require('../app/api/controllers/workorder');

router.get('/', workorderController.getAll);
router.post('/', workorderController.create);
router.post('/clone', workorderController.createClone);
router.get('/numberId', workorderController.createNumberId);
router.get('/smId/:Id', workorderController.getAllBySmId);
router.get('/:Id', workorderController.getById);
router.get('/print/:Id', workorderController.getPrintDataById);
 router.put('/:Id', workorderController.updateById);
 router.delete('/:Id', workorderController.deleteById);

module.exports = router;