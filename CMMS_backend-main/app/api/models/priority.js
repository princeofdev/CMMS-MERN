const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const PrioritySchema = new Schema({
  strName: {
    type: String
  },
  intOrder: {
    type: Number,
  },
  intSysCode: {
    type: Number,
  },
  intUpdated: {
    type: Number,
  },
  strUuid: {
    type: String,
  }
});
PrioritySchema.plugin(autoIncrement.plugin, 'Priority');
PrioritySchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("Priority", PrioritySchema);
