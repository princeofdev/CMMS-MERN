
const receiptModel = require('../models/receipt');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await receiptModel.findById(req.params.Id, async function(err, receipt){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.receipt=receipt==null?{}:receipt;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		receiptModel.find({})
		.populate("intSiteID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var receipt={};
		receipt.intSiteID=req.body.intSiteID;
		receipt.dtmDateReceived=req.body.dtmDateReceived;
		receipt.dtmDateOrdered=req.body.dtmDateOrdered;
		receipt.intReceiptStatusID=req.body.intReceiptStatusID;
		receipt.intPurchaseCurrencyID=req.body.intPurchaseCurrencyID;
		receipt.intPurchaseOrderID=req.body.intPurchaseOrderID;
		receipt.intCode=req.body.intCode;
		receipt.intSupplierID=req.body.intSupplierID;
		receipt.intUpdated=req.body.intUpdated;
		receipt.strPackingSlip=req.body.intUpdated;
		
		receiptModel.findByIdAndUpdate(req.params.Id,receipt, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		receiptModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var receipt={};
		receipt.intSiteID=req.body.intSiteID;
		receipt.dtmDateReceived=req.body.dtmDateReceived;
		receipt.dtmDateOrdered=req.body.dtmDateOrdered;
		receipt.intReceiptStatusID=req.body.intReceiptStatusID;
		receipt.intPurchaseCurrencyID=req.body.intPurchaseCurrencyID;
		receipt.intPurchaseOrderID=req.body.intPurchaseOrderID;
		receipt.intCode=req.body.intCode;
		receipt.intSupplierID=req.body.intSupplierID;
		receipt.intUpdated=req.body.intUpdated;
		receipt.strPackingSlip=req.body.intUpdated;
		
		receiptModel.create(receipt, function (err, result) {

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
				receipt.strCode="WO# "+result._id;
				receiptModel.findByIdAndUpdate(result._id,receipt, function(err, movieInfo){
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