const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;
const CreditCardSchema = new Schema({
	strCardType:{	
		type: String,
	},		
	intCurrencyId: {
		type: Schema.Types.Number,
		ref:"Currency"	
	},
	strCardNickName:{
		type:String,
	},
	strCardHolderName:{
		type:String,
	},
	intCardNumber: {
		type:Number,
	},
	dtmExpirationDate: {
		type:Date,
	},
	strZipCode: {
		type:String,
	},
	bolImageUploaded: {
		type:Boolean,
	},

		
});
CreditCardSchema.plugin(autoIncrement.plugin, 'CreditCard');
module.exports = mongoose.model('CreditCard', CreditCardSchema)