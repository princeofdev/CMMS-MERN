
// const ReactPDF = require('@react-pdf/renderer');
const purchaseOrderModel = require('../models/purchaseorder');
const purchaseordernotificationModel = require("../models/purchaseordernotification");
const additionalCostModel = require('../models/additionalcost');
const purchaseorderlineitemModel = require('../models/purchaseorderlineitem');
const file=require('../models/file');


const { sendEmailByPDF } = require("../utils");

module.exports = {
	getById: function (req, res, next) {
		purchaseOrderModel
			.findById(req.params.Id)
			.populate("intBillingTermID")
			.populate("intSupplierID")
			.populate("intAccountID")
			.populate("intShipToID")
			.populate("intBillToID")
			.populate("intChargeDepartmentID")
			.populate("intCreatedByUserID")
			.populate("intSignatoryName")
			.populate("intCreditCardID")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getPrintDataAll: async function (req, res, next) {
		await purchaseOrderModel
			.findById(req.params.Id)
			.populate("intBillingTermID")
			.populate("intAccountID")
			.populate("intShipToID")
			.populate("intBillToID")
			.populate("intChargeDepartmentID")
			.populate("intSupplierID")
			.populate("intCreatedByUserID")
			.populate("intSignatoryName")
			.populate("intCreditCardID")
			.then(async function (data) {

				let lineItem = await purchaseorderlineitemModel
					.find({ intPurchaseOrderID: req.params.Id })
					.populate("intAccountID")
					.populate("intAssetID")
					.populate("intChargeDepartmentID")
					.populate("intRequestedByUserID")
					.populate("intShipToLocationID")
					.populate("intSourceAssetID")
					.populate("intSourceWorkOrderID")
					.sort({ dtmDateCreated: -1 })
					.exec();

				let additionalCost = await additionalCostModel
					.find({ intPurchaseOrderID: req.params.Id })
					.exec();
				let imageFile = await file.find({ intCreditCardID: data.intCreditCardID })
					.sort({ dtmDateCreated: 1 })
				.exec();

				let result = {};
				result.purchaseOrder = data;
				result.lineItem = lineItem;
				result.additionalCost = additionalCost;
				result.imageFile = imageFile;

				res.status(200).json({ msg: "Found!", data: result });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	getAll: function (req, res, next) {
		purchaseOrderModel
			.find()
			.populate("intBillingTermID")
			.populate("intSupplierID")
			.populate("intAccountID")
			.populate("intShipToID")
			.populate("intBillToID")
			.populate("intCreatedByUserID")
			.populate("intCreditCardID")
			// .populate("intSignatoryName")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});

	},

	updateById: function (req, res, next) {
		var data = {};
		if (req.body.dtmDateExpectedDelivery !== undefined)
			data.dtmDateExpectedDelivery = req.body.dtmDateExpectedDelivery;
		// data.dtmDateSubmitted = req.body.dtmDateSubmitted;
		if (req.body.intBillingTermID !== undefined)
			data.intBillingTermID = req.body.intBillingTermID;
		if (req.body.intChargeDepartmentID !== undefined)
			data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		if (req.body.intCode !== undefined)
			data.intCode = req.body.intCode;
		data.intCreatedByUserID = req.userId;
		if (req.body.intPurchaseOrderStatusID !== undefined)
			data.intPurchaseOrderStatusID = req.body.intPurchaseOrderStatusID;
		if (req.body.intSendToSupplierMethod !== undefined)
			data.intSendToSupplierMethod = req.body.intSendToSupplierMethod;
		if (req.body.intSiteID !== undefined)
			data.intSiteID = req.body.intSiteID;
		if (req.body.intSupplierID !== undefined)
			data.intSupplierID = req.body.intSupplierID;
		if (req.body.intUpdated !== undefined)
			data.intUpdated = req.body.intUpdated;
		if (req.body.dtmDateLastUpdated !== undefined)
			data.dtmDateLastUpdated = req.body.dtmDateLastUpdated;
		if (req.body.dtmDateReceived !== undefined)
			data.dtmDateReceived = req.body.dtmDateReceived;
		if (req.body.dtmDateRequiredBy !== undefined)
			data.dtmDateRequiredBy = req.body.dtmDateRequiredBy;
		if (req.body.intAccountID !== undefined)
			data.intAccountID = req.body.intAccountID;
		if (req.body.intAssetID !== undefined)
			data.intAssetID = req.body.intAssetID;
		if (req.body.intBillToCountryID !== undefined)
			data.intBillToCountryID = req.body.intBillToCountryID;
		if (req.body.intBillToID !== undefined)
			data.intBillToID = req.body.intBillToID;
		if (req.body.intLastUpdatedUserID !== undefined)
			data.intLastUpdatedUserID = req.body.intLastUpdatedUserID;
		if (req.body.intPurchaseCurrencyID !== undefined)
			data.intPurchaseCurrencyID = req.body.intPurchaseCurrencyID;
		if (req.body.intShipToCountryID !== undefined)
			data.intShipToCountryID = req.body.intShipToCountryID;
		if (req.body.intShipToID !== undefined)
			data.intShipToID = req.body.intShipToID;
		if (req.body.intSupplierCountryID !== undefined)
			data.intSupplierCountryID = req.body.intSupplierCountryID;
		if (req.body.intWorkOrderID !== undefined)
			data.intWorkOrderID = req.body.intWorkOrderID;
		if (req.body.strBillToAddress !== undefined)
			data.strBillToAddress = req.body.strBillToAddress;
		if (req.body.strBillToCity !== undefined)
			data.strBillToCity = req.body.strBillToCity;
		if (req.body.strBillToPostalCode !== undefined)
			data.strBillToPostalCode = req.body.strBillToPostalCode;
		if (req.body.strBillToProvince !== undefined)
			data.strBillToProvince = req.body.strBillToProvince;
		if (req.body.strPurchaseOrderReference !== undefined)
			data.strPurchaseOrderReference = req.body.strPurchaseOrderReference;
		if (req.body.strShipToAddress !== undefined)
			data.strShipToAddress = req.body.strShipToAddress;
		if (req.body.strShipToCity !== undefined)
			data.strShipToCity = req.body.strShipToCity;
		if (req.body.strShipToPostalCode !== undefined)
			data.strShipToPostalCode = req.body.strShipToPostalCode;
		if (req.body.strShipToProvince !== undefined)
			data.strShipToProvince = req.body.strShipToProvince;
		if (req.body.strSupplierAddress !== undefined)
			data.strSupplierAddress = req.body.strSupplierAddress;
		if (req.body.strSupplierCity !== undefined)
			data.strSupplierCity = req.body.strSupplierCity;
		if (req.body.strSupplierPostalCode !== undefined)
			data.strSupplierPostalCode = req.body.strSupplierPostalCode;
		if (req.body.strSupplierProvince !== undefined)
			data.strSupplierProvince = req.body.strSupplierProvince;
		if (req.body.strTransactionID !== undefined)
			data.strTransactionID = req.body.strTransactionID;
		if (req.body.intLocationID !== undefined)
			data.intLocationID = req.body.intLocationID;
		if (req.body.strPurchaseCurrencyName !== undefined)
			data.strPurchaseCurrencyName = req.body.strPurchaseCurrencyName;
		if (req.body.strSupplierCountryName !== undefined)
			data.strSupplierCountryName = req.body.strSupplierCountryName;
		if (req.body.strShipToCountryName !== undefined)
			data.strShipToCountryName = req.body.strShipToCountryName;
		if (req.body.strBillToCountryName !== undefined)
			data.strBillToCountryName = req.body.strBillToCountryName;

		if (req.body.strSupplierReference !== undefined)
			data.strSupplierReference = req.body.strSupplierReference;
		if (req.body.strTermsPaymentMethod !== undefined)
			data.strTermsPaymentMethod = req.body.strTermsPaymentMethod;
		if (req.body.strDispatchMethod !== undefined)
			data.strDispatchMethod = req.body.strDispatchMethod;
		if (req.body.strShipmentType !== undefined)
			data.strShipmentType = req.body.strShipmentType;
		if (req.body.strPortLoading !== undefined)
			data.strPortLoading = req.body.strPortLoading;
		if (req.body.strPortDistance !== undefined)
			data.strPortDistance = req.body.strPortDistance;
		if (req.body.strPlaceDateIssue !== undefined) 
			data.strPlaceDateIssue = req.body.strPlaceDateIssue;
		if (req.body.strSignatoryCompany !== undefined)
			data.strSignatoryCompany = req.body.strSignatoryCompany;
		if (req.body.intSignatoryName !== undefined)
			data.intSignatoryName = req.body.intSignatoryName;
		if (req.body.strAdditionalInf !== undefined)
			data.strAdditionalInf = req.body.strAdditionalInf;
		if (req.body.strPurchaseOrderStatus !== undefined)
			data.strPurchaseOrderStatus = req.body.strPurchaseOrderStatus;
		if(req.body.intCreditCardID !== undefined)
			data.intCreditCardID = req.body.intCreditCardID;

		purchaseOrderModel.findByIdAndUpdate(req.params.Id, data, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		purchaseOrderModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!" });
			}
		});
	},

	create: function (req, res, next) {

		var data = {};
		data.dtmDateExpectedDelivery = req.body.dtmDateExpectedDelivery;
		data.dtmDateSubmitted = req.body.dtmDateSubmitted;
		data.intBillingTermID = req.body.intBillingTermID;
		data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		data.intCode = req.body.intCode;
		data.intCreatedByUserID = req.userId;
		data.intPurchaseOrderStatusID = req.body.intPurchaseOrderStatusID;
		data.intSendToSupplierMethod = req.body.intSendToSupplierMethod;
		data.intSiteID = req.body.intSiteID;
		data.intSupplierID = req.body.intSupplierID;
		data.intUpdated = req.body.intUpdated;
		data.dtmDateLastUpdated = req.body.dtmDateLastUpdated;
		data.dtmDateReceived = req.body.dtmDateReceived;
		data.dtmDateRequiredBy = req.body.dtmDateRequiredBy;
		data.intAccountID = req.body.intAccountID;
		data.intAssetID = req.body.intAssetID;
		data.intBillToCountryID = req.body.intBillToCountryID;
		data.intBillToID = req.body.intBillToID;
		data.intLastUpdatedUserID = req.body.intLastUpdatedUserID;
		data.intPurchaseCurrencyID = req.body.intPurchaseCurrencyID;
		data.intShipToCountryID = req.body.intShipToCountryID;
		data.intShipToID = req.body.intShipToID;
		data.intSupplierCountryID = req.body.intSupplierCountryID;
		data.intWorkOrderID = req.body.intWorkOrderID;
		data.strBillToAddress = req.body.strBillToAddress;
		data.strBillToCity = req.body.strBillToCity;
		data.strBillToPostalCode = req.body.strBillToPostalCode;
		data.strBillToProvince = req.body.strBillToProvince;
		data.strPurchaseOrderReference = req.body.strPurchaseOrderReference;
		data.strShipToAddress = req.body.strShipToAddress;
		data.strShipToCity = req.body.strShipToCity;
		data.strShipToPostalCode = req.body.strShipToPostalCode;
		data.strShipToProvince = req.body.strShipToProvince;
		data.strSupplierAddress = req.body.strSupplierAddress;
		data.strSupplierCity = req.body.strSupplierCity;
		data.strSupplierPostalCode = req.body.strSupplierPostalCode;
		data.strSupplierProvince = req.body.strSupplierProvince;
		data.strTransactionID = req.body.strTransactionID;
		data.intLocationID = req.body.intLocationID;
		data.strPurchaseCurrencyName = req.body.strPurchaseCurrencyName;
		data.strSupplierCountryName = req.body.strSupplierCountryName;
		data.strShipToCountryName = req.body.strShipToCountryName;
		data.strBillToCountryName = req.body.strBillToCountryName;
		data.intCreditCardID = req.body.intCreditCardID;

		data.strSupplierReference = req.body.strSupplierReference;
		data.strTermsPaymentMethod = req.body.strTermsPaymentMethod;
		data.strDispatchMethod = req.body.strDispatchMethod;
		data.strShipmentType = req.body.strShipmentType;
		data.strPortLoading = req.body.strPortLoading;
		data.strPortDistance = req.body.strPortDistance;
		data.strPlaceDateIssue = req.body.strPlaceDateIssue;
		data.strSignatoryCompany = req.body.strSignatoryCompany;
		data.intSignatoryName = req.body.intSignatoryName;
		data.strAdditionalInf = req.body.strAdditionalInf;
		data.strPurchaseOrderStatus = req.body.strPurchaseOrderStatus;
		purchaseOrderModel.create(data, async function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Save failed", data: null });
			}
			else {
				var poUser = {};
				poUser.intUserTypeID = 0;
				poUser.intUserID = req.userId;
				poUser.intPurchaseOrderID = result._id;
				await purchaseordernotificationModel.create(poUser, function (err, inf) {
				});
				res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
			}
		});
	},
	sendMail: async function (req, res, next) {
		// var pdfPath ="../../../public/upload/file_1622362454359_sm report.pdf";
		// console.log(__dirname,'__dirname');
		console.log('sdfsdf')
		//  var res=await sendEmailByPDF('pavel.kal.1017@gmail.com',"","");
		var result = await sendEmailByPDF('smitukov@bk.ru', "", "");
		if (result.ok) {
			res.status(200).json({ msg: "Sent successfully!", data: {} });
		}
		else {
			res.status(400).json({ msg: "sending failed!" });
		}
	}
}