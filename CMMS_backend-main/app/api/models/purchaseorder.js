const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const PurchaseOrderSchema = new Schema({

  dtmDateCreated: {
    type: Date,
    default: Date.now,
  },
  dtmDateExpectedDelivery: {
    type: Date,
  },
  dtmDateSubmitted: {
    type: Date,
    default: Date.now,
  },
  intBillingTermID: {
    type: Schema.Types.Number,
    ref: "BillingTerm",
  },
  intChargeDepartmentID: {
    type: Schema.Types.Number,
    ref: "Chargedepartment",
  },
  intCode: {
    type: Number
  },
  intCreatedByUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  intPurchaseOrderStatusID: {
    type: Number
  },
  intSendToSupplierMethod: {
    type: Number
  },
  intSiteID: {
    type: Number
  },
  intSupplierID: {
    type: Schema.Types.Number,
    ref: "Bussinesses",
  },
  intCreditCardID: {
    type: Schema.Types.Number,
    ref: "CreditCard",
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },
  dtmDateLastUpdated: {
    type: Date,
    default: Date.now,
  },
  dtmDateReceived: {
    type: Date,
  },
  dtmDateRequiredBy: {
    type: Date,
  },
  intAccountID: {
    type: Schema.Types.Number,
    ref: "Account",
  },
  intAssetID: {
    type: Number
  },
  intBillToCountryID: {
    type: Number
  },
  intBillToID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intLastUpdatedUserID: {
    type: Number
  },
  intPurchaseCurrencyID: {
    type: Number
  },
  intShipToCountryID: {
    type: Number
  },
  intShipToID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intSupplierCountryID: {
    type: Number
  },
  intWorkOrderID: {
    type: Number
  },
  strBillToAddress: {
    type: String
  },
  strBillToCity: {
    type: String
  },
  strBillToPostalCode: {
    type: String
  },
  strBillToProvince: {
    type: String
  },
  strPurchaseOrderReference: {
    type: String
  },
  strShipToAddress: {
    type: String
  },
  strShipToCity: {
    type: String
  },
  strShipToPostalCode: {
    type: String
  },
  strShipToProvince: {
    type: String
  },
  strSupplierAddress: {
    type: String
  },
  strSupplierCity: {
    type: String
  },
  strSupplierPostalCode: {
    type: String
  },
  strSupplierProvince: {
    type: String
  },
  strTransactionID: {
    type: String
  },
  intLocationID: {
    type: Number
  },
  strPurchaseCurrencyName: { // customize by mine
    type: String
  },
  strSupplierCountryName: {
    type: String// customize by mine
  },
  strShipToCountryName: {// customize by mine
    type: String
  },
  strBillToCountryName: {// customize by mine
    type: String
  },
  strConfirmation: { //customize by mine
    type: String
  },
  strSupplierReference: {//customize by mine
    type: String
  },
  strTermsPaymentMethod: { //customized by mine
    type: String
  },
  strDispatchMethod: {//customized by mine
    type: String
  },
  strShipmentType: {//customized by mine
    type: String
  },
  strPortLoading: {//customized by mine
    type: String
  },
  strPortDistance: {//customized by mine
    type: String
  },
  strPlaceDateIssue: {//customized by mine
    type:String
  },
  strSignatoryCompany: {//customized by mine
    type: String
  },
  intSignatoryName: {//customized by mine
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  strAdditionalInf: {//customized by mine
    type:String
  },
  strPurchaseOrderStatus:{//Draft,Waiting for Approval, Approved, cancelled, rejected,On Order
    type:String,
    default:'Draft'
  }
});
// WorkOrderSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
PurchaseOrderSchema.plugin(autoIncrement.plugin, "PurchaseOrder");
module.exports = mongoose.model("PurchaseOrder", PurchaseOrderSchema);
