const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const SiteUserGroupSchema = new Schema({
  intSiteUserID: {
    type: Number
  },
  intGroupID: {
    type: Number
  }
});
SiteUserGroupSchema.plugin(autoIncrement.plugin, 'SiteUserGroup');
SiteUserGroupSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("SiteUserGroup", SiteUserGroupSchema);
