const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  strName: {
    type: String,
    unique: true,
    trim: true,  
  },
  strDescription: {
    type: String,
  },
  dtmDateCreated: {
    type: Date,
    default: Date.now,
  },  
});
LocationSchema.plugin(autoIncrement.plugin, 'Location');
LocationSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("Location", LocationSchema);
