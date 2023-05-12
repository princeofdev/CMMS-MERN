const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AdditionalCoastSchema = new Schema({
	intPurchaseOrderID: {
		type: Schema.Types.Number,
		ref: "PurchaseOrder",
	},
	strCostType: {
		type: String	
	},
	intCostTypeId:{
		type:Number
	},
	strNotes:{
		type:String
	},
	strShippingType:{
		type:String
	},
	intShippingType:{
		type:Number
	},
	intAmount:{
		type:Number
	},
	intUpdated: {
		type: Date,
		default: Date.now,
	},
	
});
AdditionalCoastSchema.plugin(autoIncrement.plugin, 'AdditionalCoast');
// AdditionalCoastSchema.plugin(unique, { message: 'That strCode is already taken.' });
module.exports = mongoose.model('AdditionalCoast', AdditionalCoastSchema)