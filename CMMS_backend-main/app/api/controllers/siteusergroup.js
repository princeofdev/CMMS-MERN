
const siteUserGroupModel = require('../models/siteusergroup');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await siteUserGroupModel.findById(req.params.Id, async function(err, siteusergroup){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.siteusergroup=siteusergroup==null?{}:siteusergroup;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		siteUserGroupModel.find({})
		.populate("intSiteUserID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var siteusergroup={};
		siteusergroup.intSiteUserID=req.body.intSiteUserID;
		siteusergroup.intGroupID=req.body.intGroupID;
		
		siteUserGroupModel.findByIdAndUpdate(req.params.Id,siteusergroup, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		siteUserGroupModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var siteusergroup={};
		siteusergroup.intSiteUserID=req.body.intSiteUserID;
		siteusergroup.intGroupID=req.body.intGroupID;
		
		siteUserGroupModel.create(siteusergroup, function (err, result) {

			if (err) {					
				if (err.errors) {	
					if (err.errors.intSiteUserID) {
						res.status(400).json({ msg: err.errors.intSiteUserID.message });
						return;
					}					
				}
				console.log(err);
				res.status(400).json({ msg: "Saved failed", data: null});
			}else{
				siteusergroup.strCode="WO# "+result._id;
				siteUserGroupModel.findByIdAndUpdate(result._id,siteusergroup, function(err, movieInfo){
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