
const SiteUserModel = require('../models/siteuser');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await SiteUserModel.findById(req.params.Id, async function(err, siteuser){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.siteuser=siteuser==null?{}:siteuser;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		SiteUserModel.find({})
		.populate("intSiteID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var siteuser={};
		siteuser.intSiteID=req.body.intSiteID;
		siteuser.intUserID=req.body.intUserID;
		
		SiteUserModel.findByIdAndUpdate(req.params.Id,siteuser, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		SiteUserModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var siteuser={};
		siteuser.intSiteID=req.body.intSiteID;
		siteuser.intUserID=req.body.intUserID;
		
		SiteUserModel.create(siteuser, function (err, result) {

			if (err) {					
				if (err.errors) {	
					if (err.errors.intSiteID) {
						res.status(400).json({ msg: err.errors.intSiteID.message });
						return;
					}					
				}
				console.log(err);
				res.status(400).json({ msg: "Saved failed", data: null});
			}else{
				siteuser.strCode="WO# "+result._id;
				SiteUserModel.findByIdAndUpdate(result._id,siteuser, function(err, movieInfo){
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