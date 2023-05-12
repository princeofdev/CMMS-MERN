const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AssetBusinessSchema = new Schema({
	// intBusinessID: {
	// 	type: Number,		
	// },		
	// intBusinessRoleTypeID: {
	// 	type: Number
	// },
	// intAssetID: {
	// 	type: Schema.Types.Number,
	// 	ref:"Asset"
	// },
	// bolSendRFQs: {
	// 	type: Boolean	
	// },
	// bolPreferredVendor: {
	// 	type: Boolean	
	// },
	// qtyEconomicBatchQuantity: {
	// 	type: Number	
	// },
	// strBusinessAssetNumber: {
	// 	type: String	
	// },
	// intBusinessGroupID: {
	// 	type: Number	
	// },
	// //customize by mine
	// strCategory: {
	// 	type: String	
	// },
	strBusinessName: {
		type: String
	},
	intBusinessRoleTypeID: {
		type: Number
	},
	strAssetName: {
		type: String
	},
	strBusinessGroupName: {
		type: String
	},

	// intAssetId:{
	// 	type: Number
	// },
	intBusinessGroupId: { // asset Id
		type: Schema.Types.Number,
		ref: "Bussinesses"
		// type: Number
	},
	intBusinessId: { // asset Id
		type: Schema.Types.Number,
		ref: "Bussinesses"
		// type: Number
	},
	
});
AssetBusinessSchema.plugin(autoIncrement.plugin, 'AssetBusiness');
module.exports = mongoose.model('AssetBusiness', AssetBusinessSchema)