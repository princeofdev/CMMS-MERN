const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const SettingChargeDepartmentSchema = new Schema({
  strCode: {
    type: String,
    unique: true,
  },
  strDescription: {
    type: String,
  },
  intFacilityID: {
    type: Number,
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },
});
SettingChargeDepartmentSchema.plugin(
  autoIncrement.plugin,
  "SettingChargedepartment"
);
SettingChargeDepartmentSchema.plugin(unique, {
  message: "That strCode is already taken.",
});
module.exports = mongoose.model(
  "SettingChargedepartment",
  SettingChargeDepartmentSchema
);
