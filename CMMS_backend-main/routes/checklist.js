const express = require('express');
const router = express.Router();
const checklistController = require('../app/api/controllers/checklist');

router.get('/charterid/:Id', checklistController.getAll);
router.get('/assignuser/:Id', checklistController.getAllByAssign);
router.post('/', checklistController.create);
router.get('/checklist/:Id', checklistController.getById);
router.put('/:Id', checklistController.updateById);
router.delete('/:Id', checklistController.deleteById);

module.exports = router;