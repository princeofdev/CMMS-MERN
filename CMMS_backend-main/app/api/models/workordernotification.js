const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const WorkOrderNotificationSchema = new Schema({
	intWorkOrderID: {
		type: Schema.Types.Number,
		ref: "Workorder"
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
WorkOrderNotificationSchema.plugin(autoIncrement.plugin, 'WorkOrderNotification');
module.exports = mongoose.model('WorkOrderNotification', WorkOrderNotificationSchema)