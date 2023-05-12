const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const ScheduledMaintenanceAssetSchema = new Schema({
	intScheduledMaintenanceID:{
		type:Number
	},	
	intAssetID:{
		type:Number
	}
});
ScheduledMaintenanceAssetSchema.plugin(autoIncrement.plugin, 'ScheduledMaintenanceAsset');
// ScheduledMaintenaceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = mongoose.model('ScheduledMaintenanceAsset', ScheduledMaintenanceAssetSchema)