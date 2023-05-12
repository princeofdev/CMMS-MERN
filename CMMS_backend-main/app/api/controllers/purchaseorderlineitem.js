
const purchaseorderlineitemModel = require('../models/purchaseorderlineitem');

module.exports = {
	getById: function (req, res, next) {

		purchaseorderlineitemModel.findById(req.params.Id, function (err, result) {

			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({ msg: "Found!", data: result });
			}
		});
	},

	getAll: function (req, res, next) {
		purchaseorderlineitemModel
			.find({})
			.populate("intAccountID")
			.populate("intAssetID")
			.populate("intSupplierID")
			.populate("intChargeDepartmentID")
			.populate("intRequestedByUserID")
			.populate("intShipToLocationID")
			.populate("intSourceAssetID")
			.populate("intSourceWorkOrderID")
			.sort({ dtmDateCreated: -1 })
			.then(function (data) {
				console.log(data);
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getAllByPOID: function (req, res, next) {
		purchaseorderlineitemModel
			.find({ intPurchaseOrderID: req.params.Id})
			.populate("intAccountID")
			.populate("intAssetID")
			.populate("intSupplierID")
			.populate("intChargeDepartmentID")
			.populate("intRequestedByUserID")
			.populate("intShipToLocationID")
			.populate("intSourceAssetID")
			.populate("intSourceWorkOrderID")
			.sort({ dtmDateCreated: -1 })
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getAllFromBoard: function (req, res, next) {
		purchaseorderlineitemModel
			.find({ bolFromPurchaseBoard: true})
			.populate("intAccountID")
			.populate("intAssetID")
			.populate("intSupplierID")
			.populate("intChargeDepartmentID")
			.populate("intRequestedByUserID")
			.populate("intShipToLocationID")
			.populate("intSourceAssetID")
			.populate("intSourceWorkOrderID")
			.sort({ dtmDateCreated: -1 })
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	updateById: function (req, res, next) {
		console.log(req.body)
		var data = {};
		if (req.body.bolAddedDirectlyToPurchaseOrder != undefined)
			data.bolAddedDirectlyToPurchaseOrder = req.body.bolAddedDirectlyToPurchaseOrder;
		if (req.body.bolProductionEquipmentDownWhileOnOrder != undefined)
			data.bolProductionEquipmentDownWhileOnOrder = req.body.bolProductionEquipmentDownWhileOnOrder;
		if (req.body.dblRemoteOrgUnitPrice != undefined)
			data.dblRemoteOrgUnitPrice = req.body.dblRemoteOrgUnitPrice;
		if (req.body.dblTaxRate != undefined)
			data.dblTaxRate = req.body.dblTaxRate;
		if (req.body.dblUnitPrice != undefined)
			data.dblUnitPrice = req.body.dblUnitPrice;
		if (req.body.intAccountID != undefined)
			data.intAccountID = req.body.intAccountID;
		if (req.body.intAssetID != undefined)
			data.intAssetID = req.body.intAssetID;
		if (req.body.intChargeDepartmentID != undefined)
			data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		data.intRequestedByUserID = req.userId;
		if (req.body.intShipToLocationID != undefined)
			data.intShipToLocationID = req.body.intShipToLocationID;
		if (req.body.intSiteID != undefined)
			data.intSiteID = req.body.intSiteID;
		if (req.body.intSourceAssetID != undefined)
			data.intSourceAssetID = req.body.intSourceAssetID;
		if (req.body.intSourceWorkOrderID != undefined)
			data.intSourceWorkOrderID = req.body.intSourceWorkOrderID;
		if (req.body.intStockHistoryID != undefined)
			data.intStockHistoryID = req.body.intStockHistoryID;
		if (req.body.intStockID != undefined)
			data.intStockID = req.body.intStockID;
		if (req.body.intSupplierID != undefined)
			data.intSupplierID = req.body.intSupplierID;
		if (req.body.qtyOnOrder != undefined)
			data.qtyOnOrder = req.body.qtyOnOrder;
		if (req.body.qtyRecieved != undefined)
			data.qtyRecieved = req.body.qtyRecieved;
		if (req.body.strBusinessAssetNumber != undefined)
			data.strBusinessAssetNumber = req.body.strBusinessAssetNumber;
		if (req.body.strDescription != undefined)
			data.strDescription = req.body.strDescription;
		if (req.body.intParentPurchaseOrderLineItemID != undefined)
			data.intParentPurchaseOrderLineItemID = req.body.intParentPurchaseOrderLineItemID;
		if (req.body.strNotInventory != undefined)
			data.strNotInventory = req.body.strNotInventory;
		if (req.body.qtyOnOrder2 != undefined)
			data.qtyOnOrder2 = req.body.qtyOnOrder2;
		if (req.body.bolEquipmentCon != undefined)
			data.bolEquipmentCon = req.body.bolEquipmentCon;
		if (req.body.dtmRequiredByDate != undefined)
			data.dtmRequiredByDate = req.body.dtmRequiredByDate
		if (req.body.strPartNumber!=undefined)
			data.strPartNumber = req.body.strPartNumber;
		if (req.body.strSupplierName!=undefined)
			data.strSupplierName = req.body.strSupplierName;
		if(req.body.bolFromPurchaseBoard!=undefined)
			data.bolFromPurchaseBoard = req.body.bolFromPurchaseBoard;

		purchaseorderlineitemModel.findByIdAndUpdate(req.params.Id, data, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		purchaseorderlineitemModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!" });
			}
		});
	},

	create: function (req, res, next) {
		var data = {};
		data.bolAddedDirectlyToPurchaseOrder = req.body.bolAddedDirectlyToPurchaseOrder;
		data.bolProductionEquipmentDownWhileOnOrder = req.body.bolProductionEquipmentDownWhileOnOrder;
		data.dblRemoteOrgUnitPrice = req.body.dblRemoteOrgUnitPrice;
		data.dblTaxRate = req.body.dblTaxRate;
		data.dblUnitPrice = req.body.dblUnitPrice;
		data.intAccountID = req.body.intAccountID;
		data.intAssetID = req.body.intAssetID;
		data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		data.intRequestedByUserID = req.userId;
		data.intShipToLocationID = req.body.intShipToLocationID;
		data.intSiteID = req.body.intSiteID;
		data.intSourceAssetID = req.body.intSourceAssetID;
		data.intSourceWorkOrderID = req.body.intSourceWorkOrderID;
		data.intStockHistoryID = req.body.intStockHistoryID;
		data.intStockID = req.body.intStockID;
		data.intSupplierID = req.body.intSupplierID;
		data.qtyOnOrder = req.body.qtyOnOrder;
		data.qtyRecieved = req.body.qtyRecieved;
		data.strBusinessAssetNumber = req.body.strBusinessAssetNumber;
		data.strDescription = req.body.strDescription;
		data.intParentPurchaseOrderLineItemID = req.body.intParentPurchaseOrderLineItemID;
		data.strNotInventory = req.body.strNotInventory;
		data.qtyOnOrder2 = req.body.qtyOnOrder2;
		data.bolEquipmentCon = req.body.bolEquipmentCon;
		data.dtmRequiredByDate = req.body.dtmRequiredByDate
		data.intPurchaseOrderID = req.body.intPurchaseOrderID;
		data.bolFromPurchaseBoard = req.body.bolFromPurchaseBoard;
		console.log("backend",data);
		purchaseorderlineitemModel.create(data, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Save failed", data: null });
			}
			else {
				res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
			}



		});
	},


}