const express = require('express');
const router = express.Router();
const entrydrillsController = require('../app/api/controllers/entrydrills');

 router.get('/', entrydrillsController.getAll);
 router.post('/', entrydrillsController.create);
 router.get('/:Id', entrydrillsController.getById);
 router.put('/:Id', entrydrillsController.updateById);
 router.put('/print/:Id', entrydrillsController.printById);
 router.delete('/:Id', entrydrillsController.deleteById);

module.exports = router;