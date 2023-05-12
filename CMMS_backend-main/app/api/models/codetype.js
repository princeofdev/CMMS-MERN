const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const CodeTypeSchema = new Schema({
	strCode:{	
		type:String,	
		required: [true, 'Code is required.'],
		unique: true,
	},		
	strDescription: {
		type: String,		
	},
		
});
CodeTypeSchema.plugin(autoIncrement.plugin, 'CodeType');
CodeTypeSchema.plugin(unique, { message: 'That CodeName is already taken.' });
module.exports = mongoose.model('CodeType', CodeTypeSchema)