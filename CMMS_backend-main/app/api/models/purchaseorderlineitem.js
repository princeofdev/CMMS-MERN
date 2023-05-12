const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const PurchaseOrderLineItemSchema = new Schema({

  dtmDateCreated:{
    type: Date,
    default: Date.now,
  }, 
  dtmRequiredByDate: {
    type: Date,  
  },
  intAccountID: {
    type: Schema.Types.Number,
    ref: "Account",
  },
  intAssetID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intChargeDepartmentID: {
    type: Schema.Types.Number,
    ref: "Chargedepartment",
  },
  intPurchaseOrderID: {
    type: Schema.Types.Number,
    ref: "PurchaseOrder",
  },
  intRequestedByUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  intShipToLocationID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intSiteID: {
    type: Number
  },
  intSourceAssetID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intSourceWorkOrderID: {
    type: Schema.Types.Number,
    ref: "Workorder",
  },
  intStockHistoryID: {
    type: Number
  },
  intStockID: {
    type: Number
  },
  intSupplierID: {
    type: Schema.Types.Number,
    ref: "Bussinesses",
  },
  qtyOnOrder: {
    type: Number
  },
  qtyRecieved: {
    type: Number
  },
  strBusinessAssetNumber: {
    type: String
  },
  strDescription: {
    type: String
  },
  intParentPurchaseOrderLineItemID: {
    type: Number
  },
  strNotInventory:{ //customize me
    type:String
  },
  qtyOnOrder2:{ //customize me
    type:Number
  },
  bolEquipmentCon: {//customize me
    type:Boolean
  },
  strPartNumber:{ //customize me
    type:String
  },
  strSupplierName:{
    type:String
  },
  bolFromPurchaseBoard:{
    type:Boolean,
  }
});
PurchaseOrderLineItemSchema.plugin(autoIncrement.plugin, "PurchaseOrderLineItem");
module.exports = mongoose.model("PurchaseOrderLineItem", PurchaseOrderLineItemSchema);
