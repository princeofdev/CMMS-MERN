const express = require('express');
const router = express.Router();
const priorityController = require('../app/api/controllers/priority');

 router.get('/', priorityController.getAll);
 router.post('/', priorityController.create);
 router.get('/:Id', priorityController.getById);
 router.put('/:Id', priorityController.updateById);
 router.delete('/:Id', priorityController.deleteById);

module.exports = router;