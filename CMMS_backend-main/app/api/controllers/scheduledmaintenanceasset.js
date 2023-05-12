
const scheduledMaintenanceAssetModel = require('../models/scheduledmaintenanceasset');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await scheduledMaintenanceAssetModel.findById(req.params.Id, async function(err, scheduledmaintenanceasset){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.scheduledmaintenanceasset=scheduledmaintenanceasset==null?{}:scheduledmaintenanceasset;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		scheduledMaintenanceAssetModel.find({})
		.populate("intScheduledMaintenanceID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var scheduledmaintenanceasset={};
		scheduledmaintenanceasset.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenanceasset.intAssetID=req.body.intAssetID;
		
		scheduledMaintenanceAssetModel.findByIdAndUpdate(req.params.Id,scheduledmaintenanceasset, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		scheduledMaintenanceAssetModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var scheduledmaintenanceasset={};
		scheduledmaintenanceasset.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenanceasset.intAssetID=req.body.intAssetID;
		
		scheduledMaintenanceAssetModel.create(scheduledmaintenanceasset, function (err, result) {

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
				scheduledmaintenanceasset.strCode="WO# "+result._id;
				scheduledMaintenanceAssetModel.findByIdAndUpdate(result._id,scheduledmaintenanceasset, function(err, movieInfo){
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