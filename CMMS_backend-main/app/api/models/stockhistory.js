const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const StockHistorySchema = new Schema({
  dblLastPrice: {
    type: Number,    
  },
  dtmDate: {
    type: Date,
    default: Date.now,
  },
  intInventoryMethodType: {
    type: Number,
  },
  intStockID: {
    type: Number,
  },
  intStockTxID: {
    type: Number,
  },
  intStockTxTypeID: {
    type: Number,
  },
  intUserID: {
    type: Number,
  },
  qtyAfter: {
    type: Number,
  },
  qtyBefore: {
    type: Number,
  },
  qtyMethodQty: {
    type: Number,
  },
  qtyQuantity: {
    type: Number,
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },
});
StockHistorySchema.plugin(autoIncrement.plugin, 'StockHistory');
// StockSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("StockHistory", StockHistorySchema);
