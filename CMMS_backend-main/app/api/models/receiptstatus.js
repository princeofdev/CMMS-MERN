const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const ReceiptStatusSchema = new Schema({
  strName: {
    type: String
  },  
  intControlID: {
    type: Number,
  },
  intSysCode: {
    type: Number,
  },
  strDefaultLabel: {
    type: String
  },
  intUpdated: {
    type: Number,
  }
});
ReceiptStatusSchema.plugin(autoIncrement.plugin, 'ReceiptStatus');
ReceiptStatusSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("ReceiptStatus", ReceiptStatusSchema);
