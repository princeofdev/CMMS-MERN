const express = require("express");
const router = express.Router();
const settingaccountController = require("../app/api/controllers/settingaccount");

router.get("/", settingaccountController.getAll);
router.post("/", settingaccountController.create);
//  router.get('/:Id', entrydrillsController.getById);
//  router.put('/:Id', entrydrillsController.updateById);
//  router.put('/print/:Id', entrydrillsController.printById);
router.delete("/:Id", settingaccountController.deleteById);

module.exports = router;
