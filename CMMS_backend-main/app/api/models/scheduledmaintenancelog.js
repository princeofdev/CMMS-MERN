const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const ScheduledMaintenaceLogSchema = new Schema({	
	intScheduledMaintenanceID:{
		type:Number
	},
	strLogType:{
		type:String
	},
	intUserId:{
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	strNote:{
		type:String,
		default:""
	},
	strStatus:{
		type:String
	},
	dtmDate:{
		type:Date,
		default: Date.now,
	},
});
ScheduledMaintenaceLogSchema.plugin(autoIncrement.plugin, 'ScheduledMaintenaceLog');
module.exports = mongoose.model('ScheduledMaintenaceLog', ScheduledMaintenaceLogSchema)