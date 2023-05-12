const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const EntryDrillSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now  
  },
  revisedDate: {
    type: Date
  },
  printedDate: {
    type: Date
  },
  orderDate: {
    type: String
  },
  orderStatus: {
    type: String
  },
  entryDrills:{
    type:String
  } 
 
});
EntryDrillSchema.plugin(autoIncrement.plugin, 'EntryDrills');
// ProjectSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("EntryDrills", EntryDrillSchema);
