
const priorityModel = require('../models/priority');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await priorityModel.findById(req.params.Id, async function(err, priority){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.priority=priority==null?{}:priority;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		priorityModel.find({})
		.populate("strName")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var priority={};
		priority.strName=req.body.strName;
		priority.intOrder=req.body.intOrder;
		priority.intSysCode=req.body.intSysCode;
		priority.intUpdated=req.body.intUpdated;
		priority.strUuid=req.body.strUuid;
		
		priorityModel.findByIdAndUpdate(req.params.Id,priority, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		priorityModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var priority={};
		priority.strName=req.body.strName;
		priority.intOrder=req.body.intOrder;
		priority.intSysCode=req.body.intSysCode;
		priority.intUpdated=req.body.intUpdated;
		priority.strUuid=req.body.strUuid;		
		
		priorityModel.create(priority, function (err, result) {

			if (err) {					
				if (err.errors) {	
					if (err.errors.strName) {
						res.status(400).json({ msg: err.errors.strName.message });
						return;
					}					
				}
				console.log(err);
				res.status(400).json({ msg: "Saved failed", data: null});
			}else{
				priority.strCode="WO# "+result._id;
				priorityModel.findByIdAndUpdate(result._id,priority, function(err, movieInfo){
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