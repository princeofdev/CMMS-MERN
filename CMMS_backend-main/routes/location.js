const express = require('express');
const router = express.Router();
const locationController = require('../app/api/controllers/location');

router.get('/', locationController.getAll);
router.post('/', locationController.create);
router.get('/:Id', locationController.getById);
router.put('/:Id', locationController.updateById);
router.delete('/:Id', locationController.deleteById);

module.exports = router;