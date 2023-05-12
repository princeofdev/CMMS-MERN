const express = require('express');
const router = express.Router();
const workorderbusinessController = require('../app/api/controllers/workorderbusiness');

router.get('/', workorderbusinessController.getAll);
router.get('/:workorderId', workorderbusinessController.getByWorkorderId);
router.post('/', workorderbusinessController.create);
router.get('/:workorderbusinessId', workorderbusinessController.getById);
router.get('/filter/:Id', workorderbusinessController.getByFilterId);
router.put('/:Id', workorderbusinessController.updateById);
router.delete('/:Id', workorderbusinessController.deleteById);

module.exports = router;