const express = require('express');
const router = express.Router();
const siteuserController = require('../app/api/controllers/siteuser');

 router.get('/', siteuserController.getAll);
 router.post('/', siteuserController.create);
 router.get('/:Id', siteuserController.getById);
 router.put('/:Id', siteuserController.updateById);
 router.delete('/:Id', siteuserController.deleteById);

module.exports = router;