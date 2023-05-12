const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const ItemTypeSchema = new Schema({
	strItem:{	
		type:String,	
		required: [true, 'Item Name is required.'],
		unique: true,
	},
	intCodeTypeId:{
		type:Schema.Types.Number,
		ref:"CodeType"
	},		
	strDescription: {
		type: String,		
	},
		
});
ItemTypeSchema.plugin(autoIncrement.plugin, 'ItemType');
ItemTypeSchema.plugin(unique, { message: 'That Item is already taken.' });
module.exports = mongoose.model('ItemType', ItemTypeSchema)