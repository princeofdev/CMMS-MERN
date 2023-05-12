const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  intSiteID: {
    type: Number,
    unique: true,
  },  
  dtmDateReceived: {
    type: Date,
  },
  dtmDateOrdered: {
    type: Date,
  }, 
  intReceiptStatusID: {
    type: Number,
    unique: true,
  },
  intPurchaseCurrencyID: {
    type: Number,
    unique: true,
  },
  intPurchaseOrderID: {
    type: Number,
    unique: true,
  },
  intCode: {
    type: Number,
    unique: true,
  },
  intSupplierID: {
    type: Number,
    unique: true,
  },
  intUpdated: {
    type: Number,
    unique: true,
  },  
  strPackingSlip: {
    type: String,
  }
});
ReceiptSchema.plugin(autoIncrement.plugin, 'Receipt');
ReceiptSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("Receipt", ReceiptSchema);
