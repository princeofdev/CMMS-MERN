const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const LogNotificationSchema = new Schema({
	strSubject: {
		type: String	
	},	
	intRecipientId: {
		type: Schema.Types.String,
		ref: "User"
	},
	dtmDateCreated: {	
		type: Date,
		default: Date.now,
	},
	intLogType:{
		type:Number, //0--work order,1-asset,2-login,3- sm, 4-drill, 5-audit,6-charter
		default:0
	},
	intWorkOrderId:{
		type: Schema.Types.Number,
		ref: "Workorder"
	},
	intAssetId:{
		type: Schema.Types.Number,
		ref: "Asset"
	},
	intScheduledMaintenanceID:{
		type: Schema.Types.Number,
		ref: "ScheduledMaintenace"
	},
	intDrillId: {
		type: Schema.Types.Number,
		ref: "Drill"
	},
	intAuditId:{
		type: Schema.Types.Number,
		ref: "Audit"
	},
	intCharterId:{
		type: Schema.Types.Number,
		ref: "Charter"
	}

});
LogNotificationSchema.plugin(autoIncrement.plugin, "LogNotification");
module.exports = mongoose.model("LogNotification", LogNotificationSchema);
