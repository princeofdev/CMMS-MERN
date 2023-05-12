const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

const CheckListSchema = new Schema({
  intAssignedUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  intCharterId: {
    type: Schema.Types.Number,
    ref: 'Charter',
  },
  intFormBuilderId: {
    type: Schema.Types.Number,
    ref: 'FormBuilder',
  },
  dtmDateCreated: { // mine
    type: Date,
    default: Date.now,
  },
  isCompleted:{
    type:Boolean,
    default:false
  }
});
CheckListSchema.plugin(autoIncrement.plugin, 'CheckList');
// ProjectSchema.plugin(unique, { message: "That name is already taken." });
module.exports = mongoose.model("CheckList", CheckListSchema);
