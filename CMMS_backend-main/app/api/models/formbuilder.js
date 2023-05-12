const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const FormBulderSchema = new Schema({
 formData:{
   type:Array
 },
 formName:{
  type:String
 },
  dtmDateCreated: { // mine
    type: Date,
    default: Date.now,
  },
  intCategoryId:{
    type:Number
  }
});
FormBulderSchema.plugin(autoIncrement.plugin, 'FormBuilder');
// FormBulderSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("FormBuilder", FormBulderSchema);
