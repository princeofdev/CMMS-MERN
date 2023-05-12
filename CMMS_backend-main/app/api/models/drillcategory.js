const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const DrillCategorySchema = new Schema({
	strDrillCategoryName:{	
		type:String,	
		required: [true, 'DrillCategoryName is required.'],
		unique: true,
	},		
	strDescription: {
		type: String,		
	},
		
});
DrillCategorySchema.plugin(autoIncrement.plugin, 'DrillCategory');
DrillCategorySchema.plugin(unique, { message: 'That DrillCategoryName is already taken.' });
module.exports = mongoose.model('DrillCategory', DrillCategorySchema)