const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const RfqsLineItemSchema = new Schema({

  dtmDateCreated:{
    type: Date,
    default: Date.now,
  },   
  intAssetID: {
    type: Schema.Types.Number,
    ref: "Asset",
  }, 
  strDescription:{
    type:String
  },
  intQty:{
    type:Number
  },
  intQtyQuoted:{
    type:Number
  },
  intUnitPrice:{
    type:Number
  },
  intRFQSId: {
    type: Schema.Types.Number,
    ref: "Rfqs",
  },
  intRequestedByUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

});
RfqsLineItemSchema.plugin(autoIncrement.plugin, "RfqsLineItem");
module.exports = mongoose.model("RfqsLineItem", RfqsLineItemSchema);
