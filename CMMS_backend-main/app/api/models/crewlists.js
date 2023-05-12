const mongoose = require("mongoose");
// const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const CrewListSchema = new Schema({
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
    type: Date
  },
  orderStatus: {
    type: String
  },
  crewList:{
    type:String
  }  
 
});
CrewListSchema.plugin(autoIncrement.plugin, 'CrewList');
// ProjectSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("CrewList", CrewListSchema);
