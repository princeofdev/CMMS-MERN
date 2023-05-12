
const assetBusinessModel = require('../models/assetbusiness');					

module.exports = {
	getById: async function(req, res, next) {
        let assetbusiness = await assetBusinessModel.find({intBusinessId:req.params.Id}).exec();
        if(assetbusiness.length > 0){
            let result=assetbusiness;
            res.status(200).json({msg: "Asset found!", data: result});
        } else {
            res.status(200).json({ msg: "Not found", data: [] });
        }		
	},

	getAll: function(req, res, next) {

		assetBusinessModel.find({ intBusinessId:req.params.Id})
		.populate("intAssetID")
		.populate("intBusinessGroupId")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
	},

	updateById: function(req, res, next) {
		
		var data={};
		// data.intBusinessID=req.body.intBusinessID;
		data.strAssetName = req.body.assetName;
		data.intBusinessRoleTypeID=req.body.intBusinessRoleTypeID;
		data.intBusinessId=req.body.intBusinessID;
		data.strBusinessGroupName = req.body.businessGroupName;
		data.intBusinessGroupId = req.body.intBusinessGroupId;
		// data.bolSendRFQs=req.body.bolSendRFQs?true:false;
		// data.bolPreferredVendor=req.body.bolPreferredVendor;
		// data.qtyEconomicBatchQuantity=req.body.qtyEconomicBatchQuantity;
		// data.strBusinessAssetNumber=req.body.strBusinessAssetNumber;
		// data.intBusinessGroupID=req.body.intBusinessGroupID;
		// data.strCategory=req.body.strCategory;
		data.strBusinessName = req.body.businessName;
		assetBusinessModel.findByIdAndUpdate(req.params.Id,data, function(err, result){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		assetBusinessModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
		console.log(req.body);
		var data={};
		// data.intBusinessID=req.body.intBusinessID;
		data.strAssetName = req.body.assetName;
		data.intBusinessRoleTypeID=req.body.intBusinessRoleTypeID;
		data.intBusinessId=req.body.intBusinessID;
		data.strBusinessGroupName = req.body.businessGroupName;
		data.intBusinessGroupId = req.body.intBusinessGroupId;
		// data.bolSendRFQs=req.body.bolSendRFQs?true:false;
		// data.bolPreferredVendor=req.body.bolPreferredVendor;
		// data.qtyEconomicBatchQuantity=req.body.qtyEconomicBatchQuantity;
		// data.strBusinessAssetNumber=req.body.strBusinessAssetNumber;
		// data.intBusinessGroupID=req.body.intBusinessGroupID;
		// data.strCategory=req.body.strCategory;
		data.strBusinessName = req.body.businessName;
	
		assetBusinessModel.create(data, function (err, result) {

				  if (err) {					
					res.status(400).json({ msg: "Creat failed", data: null});
				  }				  
				  else
				 	 res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
				  
				});
	},
	

}					