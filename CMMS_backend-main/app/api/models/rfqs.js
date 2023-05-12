const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const RfqsSchema = new Schema({

  strQuote:{
    type:String
  },  
  dtmExpectedResonseDate: {
    type: Date,
  },
  dtmDateExpectedDelivery: {
    type: Date,
  },
  intCreatedByUserID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dtmDateCreated: {
    type: Date,
    default: Date.now,
  },
  dtmDateLastUpdated: {
    type: Date,
    default: Date.now,
  }, 
  strStatus:{//Draft,Waiting for Approval, Approved, cancelled, rejected,On Order
    type:String,
    default:'Draft'
  },
  intShipToID: {
    type: Schema.Types.Number,
    ref: "Asset",
  },
  intSupplierID: {
    type: Schema.Types.Number,
    ref: "Bussinesses",
  },
  strSupplierAddress: {
    type: String
  },
  strSupplierCity: {
    type: String
  },
  strSupplierPostalCode: {
    type: String
  },
  strSupplierProvince: {
    type: String
  },
  strSupplierCountry:{
    type:String
  },
  strShipToAddress: {
    type: String
  },
  strShipToCity: {
    type: String
  },
  strShipToPostalCode: {
    type: String
  },
  strShipToProvince: {
    type: String
  },
  strShipToCountry: {
    type: String
  },
});
// WorkOrderSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
RfqsSchema.plugin(autoIncrement.plugin, "Rfqs");
module.exports = mongoose.model("Rfqs", RfqsSchema);
