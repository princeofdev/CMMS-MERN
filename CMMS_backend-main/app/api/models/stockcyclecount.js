const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const StockCycleCountSchema = new Schema({
  dblPrice: {
    type: Number,    
  },
  dtmDateCounted: {
    type: Date,
  },
  intCountedBy: {
    type: Number,
  },
  intCycleCountID: {
    type: Number,
  },
  intStockID: {
    type: Number,
  },
  qtyStockCount: {
    type: Number,
  },
  qtyExpected: {
    type: Number,
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },
});
StockCycleCountSchema.plugin(autoIncrement.plugin, 'StockCycleCount');
// StockSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("StockCycleCount", StockCycleCountSchema);
