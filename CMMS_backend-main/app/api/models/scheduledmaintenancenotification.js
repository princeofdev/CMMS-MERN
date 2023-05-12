const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const ScheduleNotificationSchema = new Schema({
	intScheduledMaintenanceID: {
		type: Number,
	},
	intUserId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	strUserEmail:{
		type:String
	},
	bolAssign: {
		type: Boolean,
		default: false
	},
	bolStatusChange: {
		type: Boolean,
		default: false
	},
	bolWorkOrderCompletion: {
		type: Boolean,
		default: false
	},
	bolTaskCompletion: {
		type: Boolean,
		default: false
	},
	bolAssetOnline: {
		type: Boolean,
		default: false
	},
	strAssetIds:{
		type:String
	},
	dtmDateCreated: {
		type: Date,
		default: Date.now,
	}
});
ScheduleNotificationSchema.plugin(autoIncrement.plugin, 'ScheduleNotification');
module.exports = mongoose.model('ScheduleNotification', ScheduleNotificationSchema)