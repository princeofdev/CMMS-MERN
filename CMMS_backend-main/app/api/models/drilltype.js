const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const DrillTypeSchema = new Schema({
	strDrillType:{	
		type:String,	
		required: [true, 'DrillTypeName is required.'],
		unique: true,
	},		
	strDescription: {
		type: String,		
	},
		
});
DrillTypeSchema.plugin(autoIncrement.plugin, 'DrillType');
DrillTypeSchema.plugin(unique, { message: 'That DrillTypeName is already taken.' });
module.exports = mongoose.model('DrillType', DrillTypeSchema)