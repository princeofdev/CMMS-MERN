const express = require('express');
const router = express.Router();
const Controller = require('../app/api/controllers/lognotification');

router.get('/', Controller.getAll);
router.get('/user/:Id', Controller.getAllUserId);
router.get('/:Id', Controller.getById);
module.exports = router;