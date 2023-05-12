
// const ReactPDF = require('@react-pdf/renderer');
const RFQsModel = require('../models/rfqs');
// const purchaseordernotificationModel = require("../models/purchaseordernotification");
// const additionalCostModel = require('../models/additionalcost');
// const purchaseorderlineitemModel = require('../models/purchaseorderlineitem');



module.exports = {
	getById: function (req, res, next) {
		RFQsModel
			.findById(req.params.Id)		
			.populate("intCreatedByUserID")	
			.populate("intShipToID")
			.populate("intSupplierID")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getPrintDataAll: async function (req, res, next) {
		await RFQsModel
			.findById(req.params.Id)		
			.populate("intCreatedByUserID")	
			.then(async function (data) {

				// let lineItem = await purchaseorderlineitemModel
				// 	.find({ intPurchaseOrderID: req.params.Id })
				// 	.populate("intAccountID")
				// 	.populate("intAssetID")
				// 	.populate("intChargeDepartmentID")
				// 	.populate("intRequestedByUserID")
				// 	.populate("intShipToLocationID")
				// 	.populate("intSourceAssetID")
				// 	.populate("intSourceWorkOrderID")
				// 	.sort({ dtmDateCreated: -1 })
				// 	.exec();

				// let additionalCost = await additionalCostModel
				// 	.find({ intPurchaseOrderID: req.params.Id })
				// 	.exec();

				let result = {};
				result.purchaseOrder = data;
				// result.lineItem = lineItem;
				// result.additionalCost = additionalCost;

				res.status(200).json({ msg: "Found!", data: result });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getAll: function (req, res, next) {
		RFQsModel
			.find()			
			.populate("intCreatedByUserID")
			.populate("intShipToID")
			.populate("intSupplierID")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});

	},

	updateById: function (req, res, next) {

		var data = {};
		if (req.body.strQuote !== undefined)
			data.strQuote = req.body.strQuote;
		if (req.body.dtmExpectedResonseDate !== undefined)
			data.dtmExpectedResonseDate = req.body.dtmExpectedResonseDate;
		if (req.body.dtmDateExpectedDelivery !== undefined)
			data.dtmDateExpectedDelivery = req.body.dtmDateExpectedDelivery;
		if (req.body.strStatus!==undefined)
			data.strStatus = req.body.strStatus;
		if (req.body.intShipToID !== undefined)
			data.intShipToID = req.body.intShipToID;
		if (req.body.intSupplierID !== undefined)
			data.intSupplierID = req.body.intSupplierID;
		if (req.body.strSupplierAddress !== undefined)
			data.strSupplierAddress = req.body.strSupplierAddress;
		if (req.body.strSupplierCity !== undefined)
			data.strSupplierCity = req.body.strSupplierCity;
		if (req.body.strSupplierPostalCode !== undefined)
			data.strSupplierPostalCode = req.body.strSupplierPostalCode;
		if (req.body.strSupplierProvince !== undefined)
			data.strSupplierProvince = req.body.strSupplierProvince;
		if (req.body.strSupplierCountry !== undefined)
			data.strSupplierCountry = req.body.strSupplierCountry;
		if (req.body.strShipToAddress !== undefined)
			data.strShipToAddress = req.body.strShipToAddress;
		if (req.body.strShipToCity !== undefined)
			data.strShipToCity = req.body.strShipToCity;
		if (req.body.strShipToPostalCode !== undefined)
			data.strShipToPostalCode = req.body.strShipToPostalCode;
		if (req.body.strShipToProvince !== undefined)
			data.strShipToProvince = req.body.strShipToProvince;
		if (req.body.strShipToCountry !== undefined)
			data.strShipToCountry = req.body.strShipToCountry;

		RFQsModel.findByIdAndUpdate(req.params.Id, data, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		RFQsModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!" });
			}
		});
	},

	create: function (req, res, next) {

		var data = {};
		data.strQuote = req.body.strQuote;
		data.dtmExpectedResonseDate = req.body.dtmExpectedResonseDate;
		data.dtmDateExpectedDelivery = req.body.dtmDateExpectedDelivery;
		data.intCreatedByUserID = req.userId;
		
		data.intShipToID = req.body.intShipToID;
		data.intSupplierID = req.body.intSupplierID;
		data.strSupplierAddress = req.body.strSupplierAddress;
		data.strSupplierCity = req.body.strSupplierCity;
		data.strSupplierPostalCode = req.body.strSupplierPostalCode;
		data.strSupplierProvince = req.body.strSupplierProvince;
		data.strSupplierCountry = req.body.strSupplierCountry;
		data.strShipToAddress = req.body.strShipToAddress;
		data.strShipToCity = req.body.strShipToCity;
		data.strShipToPostalCode = req.body.strShipToPostalCode;
		data.strShipToProvince = req.body.strShipToProvince;
		data.strShipToCountry = req.body.strShipToCountry;

		RFQsModel.create(data, async function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Save failed", data: null });
			}
			else {			
				res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
			}
		});
	}	
}