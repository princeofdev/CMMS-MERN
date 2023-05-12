const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const ReceiptLineItemSchema = new Schema({
  intStockID: {
    type: Number
  },  
  qtyQuantityReceived: {
    type: Number
  },
  qtyQuantityOrdered: {
    type: Number
  },
  intAssetID: {
    type: Number
  },
  intReceiptID: {
    type: Number
  },
  strDescription: {
    type: String,
  },
  intParentReceiptLineItemID: {
    type: Number
  },
  intPurchaseOrderLineItemID: {
    type: Number
  },
  dtmDateExpiryOfInventoryItems: {
    type: Date,
  },
  dblPurchasePricePerUnit: {
    type: Number
  },
  intReceiveToStockID: {
    type: Number
  },
  intReceiveToFacilityID: {
    type: Number
  },
  intUpdated: {
    type: Number
  }

});
ReceiptLineItemSchema.plugin(autoIncrement.plugin, 'ReceiptLineItem');
ReceiptLineItemSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("ReceiptLineItem", ReceiptLineItemSchema);
