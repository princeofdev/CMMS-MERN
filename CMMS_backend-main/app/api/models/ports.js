const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const PortsSchema = new Schema({
	strCountryPrefix:{
		type:String
	},
	strCountryName:{
		type:String
	},
	strLoCode: {
		type: String
	},
	strName: {
		type: String
	},
	strNameWoDiacritics: {
		type: String
	},
	strSubDiv: {
		type: String
	},
	strFunction: {
		type: String
	},
	strStatus: {
		type: String
	},
	strDate: {
		type: String
	},
	strIATA: {
		type: String
	},
	strCoordinates: {
		type: String
	},
	strRemarks: {
		type: String
	},
	strPortName:{
		type:String
	}
	

}); 
PortsSchema.plugin(autoIncrement.plugin, 'Ports');
PortsSchema.plugin(unique, { message: 'That port is already taken.' });
module.exports = mongoose.model('Ports', PortsSchema)