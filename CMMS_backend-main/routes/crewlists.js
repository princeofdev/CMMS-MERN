const express = require('express');
const router = express.Router();
const crewlistsController = require('../app/api/controllers/crewlists');

 router.get('/', crewlistsController.getAll);
 router.post('/', crewlistsController.create);
 router.get('/:Id', crewlistsController.getById);
 router.put('/:Id', crewlistsController.updateById);
 router.put('/print/:Id', crewlistsController.printById);
 router.delete('/:Id', crewlistsController.deleteById);

module.exports = router;