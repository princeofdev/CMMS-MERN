const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const SettingAccountSchema = new Schema({
  strCode: {
    type: String,
    unique: true,
  },
  strDescription: {
    type: String,
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },
});
SettingAccountSchema.plugin(autoIncrement.plugin, "SettingAccount");
SettingAccountSchema.plugin(unique, {
  message: "That strCode is already taken.",
});
module.exports = mongoose.model("SettingAccount", SettingAccountSchema);
