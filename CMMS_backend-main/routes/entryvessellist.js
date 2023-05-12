const express = require('express');
const router = express.Router();
const entryVesselListController = require('../app/api/controllers/entryvessellist');

 router.get('/', entryVesselListController.getAll);
 router.post('/', entryVesselListController.create);
 router.get('/:Id', entryVesselListController.getById);
 router.put('/:Id', entryVesselListController.updateById);
 router.put('/print/:Id', entryVesselListController.printById);
 router.delete('/:Id', entryVesselListController.deleteById);

module.exports = router;