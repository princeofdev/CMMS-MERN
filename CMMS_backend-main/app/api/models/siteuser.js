const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const SiteUserSchema = new Schema({
  intSiteID: {
    type: Number
  },
  intUserID: {
    type: Number
  }
  
});
SiteUserSchema.plugin(autoIncrement.plugin, 'SiteUser');
SiteUserSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("SiteUser", SiteUserSchema);
