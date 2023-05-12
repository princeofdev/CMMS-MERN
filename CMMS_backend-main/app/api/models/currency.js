const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
	strCurrency: {
		type: String,		
	},		
	strName: {
		type: String,
		unique: true,
	},
	strISOCode: {
		type: String,
	},

}); 
CurrencySchema.plugin(autoIncrement.plugin, 'Currency');
CurrencySchema.plugin(unique, { message: 'That currency is already taken.' });
module.exports = mongoose.model('Currency', CurrencySchema)