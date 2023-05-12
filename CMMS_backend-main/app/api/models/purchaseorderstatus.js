const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const PurchaseOrderStatusSchema = new Schema({

  intSysCode:{
    type: Number,   
  },
  intControlID: {
    type: Number,
  },
  strDefaultLabel: {
    type: String,
  }, 
  strName: {
    type: String,
  },
  intUpdated:{
    type: Date,
    default: Date.now,
  }, 
});
PurchaseOrderStatusSchema.plugin(autoIncrement.plugin, "PurchaseOrderStatus");
module.exports = mongoose.model("PurchaseOrderStatus", PurchaseOrderStatusSchema);
