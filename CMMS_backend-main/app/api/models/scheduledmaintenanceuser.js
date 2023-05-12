const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const ScheduledMaintenanceUserSchema = new Schema({
	intScheduledMaintenanceID:{
		type:Number
	},	
	intUserID:{
		type:Number
	},
	bolNotifyOnAssignment:{
		type:Boolean
	},
	bolNotifyOnCompletion:{
		type:Boolean
	},
	bolNotifyOnOnlineOffline:{
		type:Boolean
	},
	bolNotifyOnStatusChange:{
		type:Boolean
	},
	bolNotifyOnTaskCompleted:{
		type:Boolean
	},

	
});
ScheduledMaintenanceUserSchema.plugin(autoIncrement.plugin, 'ScheduledMaintenanceUser');
// ScheduledMaintenaceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = mongoose.model('ScheduledMaintenanceUser', ScheduledMaintenanceUserSchema)