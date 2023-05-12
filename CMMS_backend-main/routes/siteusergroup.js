const express = require('express');
const router = express.Router();
const siteusergroupController = require('../app/api/controllers/siteusergroup');

 router.get('/', siteusergroupController.getAll);
 router.post('/', siteusergroupController.create);
 router.get('/:Id', siteusergroupController.getById);
 router.put('/:Id', siteusergroupController.updateById);
 router.delete('/:Id', siteusergroupController.deleteById);

module.exports = router;