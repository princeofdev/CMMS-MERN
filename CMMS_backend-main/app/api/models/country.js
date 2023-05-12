const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
	strLoCode: {
		type: String,
		unique: true,
	},		
	strCountryName: {
		type: String,
		unique: true,
	}

}); 
CountrySchema.plugin(autoIncrement.plugin, 'Country');
CountrySchema.plugin(unique, { message: 'That country is already taken.' });
module.exports = mongoose.model('Country', CountrySchema)