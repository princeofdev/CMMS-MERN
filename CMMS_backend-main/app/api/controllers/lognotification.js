
const logNotificationModel = require('../models/lognotification');
const workorderModel = require('../models/workorder');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		logNotificationModel.findById(req.params.Id, function(err, result){
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},
	getAll: function(req, res, next) {
		workorderModel.find({}, function(err, result){
			if (err){
				res.status(500).json({ msg: "Internal Server error." });
			} else{				
				res.status(200).json({msg: "Result found!", data: result});	
			}
		});
	},
	getAllUserId: async function (req, res, next) {
		let workOrderLog = await workorderModel
			.find({ intAssignedUserId: req.params.Id})
			.sort({ dtmDateCreated: -1 })
			.exec();
		let logs = await logNotificationModel.find({ intRecipientId: req.params.Id})
			.sort({ dtmDateCreated: -1 })
			.exec();
		let result={};
		result.workOrderLog = workOrderLog?workOrderLog:[];
		result.logs = logs ? logs:[];
		res.status(200).json({ msg: "Result found!", data: result });
		
	},


}					