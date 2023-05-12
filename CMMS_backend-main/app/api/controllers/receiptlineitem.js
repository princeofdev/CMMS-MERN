
const ReceiptLineItemModel = require('../models/receiptlineitem');
const assetModel = require('../models/assets');	
const projectModel=require('../models/project');
const userModel=require('../models/users');
module.exports = {
	getById: async function(req, res, next) {
		await ReceiptLineItemModel.findById(req.params.Id, async function(err, receiptlineitem){
			if (err) {
				res.status(400).json({ msg: "Not  found" });
			} else {
				let result={};
				result.receiptlineitem=receiptlineitem==null?{}:receiptlineitem;	
				result.asset={};
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		ReceiptLineItemModel.find({})
		.populate("intStockID")
		.then(function(data) {		
		  res.status(200).json({msg: "Found!", data: data});	
		})
		.catch(function(err) {
		  res.status(500).json({ msg: "Internal Server error" });
		});		
		
	},

	updateById: function(req, res, next) {
		var receiptlineitem={};
		receiptlineitem.intStockID=req.body.intStockID;
		receiptlineitem.qtyQuantityReceived=req.body.qtyQuantityReceived;
		receiptlineitem.qtyQuantityOrdered=req.body.qtyQuantityOrdered;
		receiptlineitem.intAssetID=req.body.intAssetID;
		receiptlineitem.intReceiptID=req.body.intReceiptID;
		receiptlineitem.strDescription=req.body.strDescription;
		receiptlineitem.intParentReceiptLineItemID=req.body.intParentReceiptLineItemID;
		receiptlineitem.intPurchaseOrderLineItemID=req.body.intPurchaseOrderLineItemID;
		receiptlineitem.dtmDateExpiryOfInventoryItems=req.body.dtmDateExpiryOfInventoryItems;
		receiptlineitem.dblPurchasePricePerUnit=req.body.dblPurchasePricePerUnit;
		receiptlineitem.intReceiveToStockID=req.body.intReceiveToStockID;
		receiptlineitem.intReceiveToFacilityID=req.body.intReceiveToFacilityID;
		receiptlineitem.intUpdated=req.body.intUpdated;
		
		ReceiptLineItemModel.findByIdAndUpdate(req.params.Id,receiptlineitem, function(err, movieInfo){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		ReceiptLineItemModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!", data:null});
			}
		});
	},

	create: function(req, res, next) {		
		var receiptlineitem={};
		receiptlineitem.intStockID=req.body.intStockID;
		receiptlineitem.qtyQuantityReceived=req.body.qtyQuantityReceived;
		receiptlineitem.qtyQuantityOrdered=req.body.qtyQuantityOrdered;
		receiptlineitem.intAssetID=req.body.intAssetID;
		receiptlineitem.intReceiptID=req.body.intReceiptID;
		receiptlineitem.strDescription=req.body.strDescription;
		receiptlineitem.intParentReceiptLineItemID=req.body.intParentReceiptLineItemID;
		receiptlineitem.intPurchaseOrderLineItemID=req.body.intPurchaseOrderLineItemID;
		receiptlineitem.dtmDateExpiryOfInventoryItems=req.body.dtmDateExpiryOfInventoryItems;
		receiptlineitem.dblPurchasePricePerUnit=req.body.dblPurchasePricePerUnit;
		receiptlineitem.intReceiveToStockID=req.body.intReceiveToStockID;
		receiptlineitem.intReceiveToFacilityID=req.body.intReceiveToFacilityID;
		receiptlineitem.intUpdated=req.body.intUpdated;
		
		ReceiptLineItemModel.create(receiptlineitem, function (err, result) {

			if (err) {					
				if (err.errors) {	
					if (err.errors.intStockID) {
						res.status(400).json({ msg: err.errors.intStockID.message });
						return;
					}					
				}
				console.log(err);
				res.status(400).json({ msg: "Saved failed", data: null});
			}else{
				receiptlineitem.strCode="WO# "+result._id;
				ReceiptLineItemModel.findByIdAndUpdate(result._id,receiptlineitem, function(err, movieInfo){
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