const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const EntryVesselListSchema = new Schema({
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
  crewComplement:{
    type:String
  },
  weather:{
    type:String
  }, 
  logEntries:{
    type:String
  },
  timePeriod:{
    type:String
  }
 
});
EntryVesselListSchema.plugin(autoIncrement.plugin, 'EntryVesselList');
// ProjectSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("EntryVesselList", EntryVesselListSchema);
