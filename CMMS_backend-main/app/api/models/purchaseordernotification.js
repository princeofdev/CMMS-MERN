const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const PurchaseOrderNotificationSchema = new Schema({
	intPurchaseOrderID: {
		type: Schema.Types.Number,
		ref: "PurchaseOrder"
	},
	intUserTypeID: {
		type: Number,	//1:group,0:user
		default: 0
	},
	intUserID: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	strUserEmail:{
		type:String
	},	
	dtmDateCreated: {
		type: Date,
		default: Date.now,
	}
});
PurchaseOrderNotificationSchema.plugin(autoIncrement.plugin, 'PurchaseOrderNotification');
module.exports = mongoose.model('PurchaseOrderNotification', PurchaseOrderNotificationSchema)