const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  intAssetID: {
    type: Schema.Types.Number,
    ref: "Asset"
  }, 
  qtyOnHand: {
    type: Number,
  },
  qtyMinQty: {
    type: Number,
  },
  intFacilityID: {
    type: Schema.Types.Number,
    ref: "Asset"
  },
  strAisle: {
    type: String,
  },
  strRow: {
    type: String,
  },
  strBin: {
    type: String,
  },
  strUuid: {
    type: String,
  },
  bolDeactivated:{
    type:Boolean
  },
   intUpdated: {
    type: Date,
    default: Date.now,
  },
  intLocationId:{
    type: Schema.Types.Number,
    ref: "Location"
  }
});
StockSchema.plugin(autoIncrement.plugin, 'Stock');
// StockSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("Stock", StockSchema);
