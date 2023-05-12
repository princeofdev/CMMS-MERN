
const scheduledMaintenanceUserModel = require('../models/scheduledmaintenanceuser');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await scheduledMaintenanceUserModel.findById(req.params.Id, async function(err, scheduledmaintenanceuser){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.scheduledmaintenanceuser=scheduledmaintenanceuser==null?{}:scheduledmaintenanceuser;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		scheduledMaintenanceUserModel.find({})
		.populate("intScheduledMaintenanceID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var scheduledmaintenanceuser={};
		scheduledmaintenanceuser.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenanceuser.intUserID=req.body.intUserID;
		scheduledmaintenanceuser.bolNotifyOnAssignment=req.body.bolNotifyOnAssignment;
		scheduledmaintenanceuser.bolNotifyOnCompletion=req.body.bolNotifyOnCompletion;
		scheduledmaintenanceuser.bolNotifyOnOnlineOffline=req.body.bolNotifyOnOnlineOffline;
		scheduledmaintenanceuser.bolNotifyOnStatusChange=req.body.bolNotifyOnStatusChange;
		scheduledmaintenanceuser.bolNotifyOnTaskCompleted=req.body.bolNotifyOnTaskCompleted;
		
		scheduledMaintenanceUserModel.findByIdAndUpdate(req.params.Id,scheduledmaintenanceuser, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		scheduledMaintenanceUserModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var scheduledmaintenanceuser={};
		scheduledmaintenanceuser.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenanceuser.intUserID=req.body.intUserID;
		scheduledmaintenanceuser.bolNotifyOnAssignment=req.body.bolNotifyOnAssignment;
		scheduledmaintenanceuser.bolNotifyOnCompletion=req.body.bolNotifyOnCompletion;
		scheduledmaintenanceuser.bolNotifyOnOnlineOffline=req.body.bolNotifyOnOnlineOffline;
		scheduledmaintenanceuser.bolNotifyOnStatusChange=req.body.bolNotifyOnStatusChange;
		scheduledmaintenanceuser.bolNotifyOnTaskCompleted=req.body.bolNotifyOnTaskCompleted;
		scheduledMaintenanceUserModel.create(scheduledmaintenanceuser, function (err, result) {

			if (err) {					
				if (err.errors) {	
					if (err.errors.intScheduledMaintenanceID) {
						res.status(400).json({ msg: err.errors.intScheduledMaintenanceID.message });
						return;
					}					
				}
				console.log(err);
				res.status(400).json({ msg: "Saved failed", data: null});
			}else{
				scheduledmaintenanceuser.strCode="WO# "+result._id;
				scheduledMaintenanceUserModel.findByIdAndUpdate(result._id,scheduledmaintenanceuser, function(err, movieInfo){
					if(err)
						res.status(400).json({ msg: "Created failed!" });
					else {
						res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
					}
				});
		
			}
				
			
		});
	},

}					