
const receiptStatusModel = require('../models/receiptstatus');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await receiptStatusModel.findById(req.params.Id, async function(err, receiptstatus){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.receiptstatus=receiptstatus==null?{}:receiptstatus;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		receiptStatusModel.find({})
		.populate("strName")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var receiptstatus={};
		receiptstatus.strName=req.body.strName;
		receiptstatus.intControlID=req.body.intControlID;
		receiptstatus.intSysCode=req.body.intSysCode;
		receiptstatus.strDefaultLabel=req.body.strDefaultLabel;
		receiptstatus.intUpdated=req.body.intUpdated;
		
		receiptStatusModel.findByIdAndUpdate(req.params.Id,receiptstatus, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		receiptStatusModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var receiptstatus={};
		receiptstatus.strName=req.body.strName;
		receiptstatus.intControlID=req.body.intControlID;
		receiptstatus.intSysCode=req.body.intSysCode;
		receiptstatus.strDefaultLabel=req.body.strDefaultLabel;
		receiptstatus.intUpdated=req.body.intUpdated;
		
		receiptStatusModel.create(receiptstatus, function (err, result) {

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
				receiptstatus.strCode="WO# "+result._id;
				receiptStatusModel.findByIdAndUpdate(result._id,receiptstatus, function(err, movieInfo){
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