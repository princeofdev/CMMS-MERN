
const scheduledMaintenancePartModel = require('../models/scheduledmaintenancepart');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await scheduledMaintenancePartModel.findById(req.params.Id, async function(err, scheduledmaintenancepart){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.scheduledmaintenancepart=scheduledmaintenancepart==null?{}:scheduledmaintenancepart;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		scheduledMaintenancePartModel.find({})
		.populate("intScheduledMaintenanceID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var scheduledmaintenancepart={};
		scheduledmaintenancepart.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenancepart.intPartID=req.body.intPartID;
		scheduledmaintenancepart.intAssetID=req.body.intAssetID;
		scheduledmaintenancepart.intStockID=req.body.intStockID;
		scheduledmaintenancepart.qtySuggestedQuantity=req.body.qtySuggestedQuantity;
		
		scheduledMaintenancePartModel.findByIdAndUpdate(req.params.Id,scheduledmaintenancepart, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		scheduledMaintenancePartModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var scheduledmaintenancepart={};
		scheduledmaintenancepart.intScheduledMaintenanceID=req.body.intScheduledMaintenanceID;
		scheduledmaintenancepart.intPartID=req.body.intPartID;
		scheduledmaintenancepart.intAssetID=req.body.intAssetID;
		scheduledmaintenancepart.intStockID=req.body.intStockID;
		scheduledmaintenancepart.qtySuggestedQuantity=req.body.qtySuggestedQuantity;
		scheduledMaintenancePartModel.create(scheduledmaintenancepart, function (err, result) {

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
				scheduledmaintenancepart.strCode="WO# "+result._id;
				scheduledMaintenancePartModel.findByIdAndUpdate(result._id,scheduledmaintenancepart, function(err, movieInfo){
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