
const additionalCostModel = require('../models/additionalcost');					

module.exports = {
	getById: function(req, res, next) {
		additionalCostModel.findById(req.params.Id, function(err, result){
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		additionalCostModel.find({ intPurchaseOrderID:req.params.Id}, function(err, result){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: result});							
			}

		});
	},

	updateById: function(req, res, next) {	
	
		var data = {};
		if (req.body.intPurchaseOrderID != undefined)
			data.intPurchaseOrderID = req.body.intPurchaseOrderID;
		if (req.body.strCostType != undefined)
			data.strCostType = req.body.strCostType;
		if (req.body.intCostTypeId != undefined)
			data.intCostTypeId = req.body.intCostTypeId;
		if (req.body.strShippingType != undefined)
			data.strShippingType = req.body.strShippingType;
		if (req.body.intAmount != undefined)
			data.intAmount = req.body.intAmount;
		if(req.body.strNotes!=undefined)
			data.strNotes=req.body.strNotes

		additionalCostModel.findByIdAndUpdate(req.params.Id, data, function(err, result){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		additionalCostModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.intPurchaseOrderID = req.body.intPurchaseOrderID;
		data.strCostType = req.body.strCostType;
		data.intCostTypeId = req.body.intCostTypeId;
		data.strShippingType = req.body.strShippingType;
		data.intAmount = req.body.intAmount;
		data.strNotes=req.body.strNotes;
		
	
		additionalCostModel.create(data, function (err, result) {

				  if (err) {					
					// if (err.errors) {	
					// 	if (err.errors.strCode) {
					// 		res.status(400).json({ msg: err.errors.strCode.message });
					// 		return;
					// 	  }						
					// }
					res.status(400).json({ msg: "Creat failed", data: null});
				  }				  
				  else
				 	 res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
				  
				});
	},
	

}					