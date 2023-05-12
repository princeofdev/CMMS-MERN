const express = require('express');
const router = express.Router();
const formbuilderController = require('../app/api/controllers/formbuilder');

router.get('/', formbuilderController.getAll);
router.post('/', formbuilderController.create);
router.get('/:Id', formbuilderController.getById);
router.put('/:Id', formbuilderController.updateById);
router.delete('/:Id', formbuilderController.deleteById);

module.exports = router;