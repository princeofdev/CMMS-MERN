const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const StockTxTypeSchema = new Schema({
  strName: {
    type: String,   
    unique: true,
  },
  dtmDateCreated: {
    type: Date,
    default: Date.now,
  },
});
StockTxTypeSchema.plugin(autoIncrement.plugin, 'StockTxType');
StockTxTypeSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("StockTxType", StockTxTypeSchema);
