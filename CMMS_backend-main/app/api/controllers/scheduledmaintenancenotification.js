
const notificationModel = require('../models/scheduledmaintenancenotification');					

module.exports = {
	getById: async function(req, res, next) {
		
		let result = await notificationModel
			.find({ intScheduledMaintenanceID: req.params.Id })			
			.populate("intUserId")
			.exec();
		res.status(200).json({ msg: "Found!", data: result });
		// notificationModel.find({intScheduledMaintenanceID:req.params.Id}, function(err, result){
			
		// 	if (err) {
		// 		res.status(400).json({ msg: "Not found" });
		// 	} else {
		// 		res.status(200).json({msg: "Found!", data: result});
		// 	}
		// });
	},

	getAll: function(req, res, next) {
		notificationModel.find({}, function(err, status){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: status});							
			}

		});
	},

	updateById: function(req, res, next) {	
		var data = {};
		data.intScheduledMaintenanceID = req.body.intScheduledMaintenanceID;
		data.intUserId = req.body.intUserId;
		data.strUserEmail = req.body.strUserEmail;
		data.bolAssign = req.body.bolAssign;
		data.bolStatusChange = req.body.bolStatusChange;
		data.bolWorkOrderCompletion = req.body.bolWorkOrderCompletion;
		data.bolTaskCompletion = req.body.bolTaskCompletion;
		data.bolAssetOnline = req.body.bolAssetOnline;
		data.strAssetIds = req.body.strAssetIds;
		notificationModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		notificationModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
		var data={};
		data.intScheduledMaintenanceID = req.body.intScheduledMaintenanceID;
		data.intUserId = req.body.intUserId;
		data.strUserEmail = req.body.strUserEmail;
		data.bolAssign = req.body.bolAssign;
		data.bolStatusChange = req.body.bolStatusChange;
		data.bolWorkOrderCompletion = req.body.bolWorkOrderCompletion;
		data.bolTaskCompletion = req.body.bolTaskCompletion;
		data.bolAssetOnline = req.body.bolAssetOnline;
		data.strAssetIds = req.body.strAssetIds;
		notificationModel.create(data, function (err, result) {
			if (err) {					
				if (err.errors) {	
					if (err.errors.strName) {
						res.status(400).json({ msg: err.errors.strName.message });
						return;
					}						
				}
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					