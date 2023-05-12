const express = require('express');
const router = express.Router();
const calendarController = require('../app/api/controllers/calendar');

router.get('/', calendarController.getAll);
router.post('/', calendarController.create);
 router.get('/:Id', calendarController.getById);
 router.put('/:Id', calendarController.updateById);
 router.delete('/:Id', calendarController.deleteById);

module.exports = router;