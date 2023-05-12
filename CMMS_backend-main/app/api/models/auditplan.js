const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AuditPlanSchema = new Schema({
	intAuditId:{
		type:Number
	},
	strAuditPlan: {
		type: String,		
	},	
	auditPlanDate: { //Date
		type: Date,		
	},
	strDepartmentVessel: {
		type: String,		
	},	
	strAuditNo: {
		type: String,		
	},
	strAuditor: {
		type: String,		
	},
	strAuditee: {
		type: String,		
	},
	openBeginAt:{
		type:Date	
	},
	openClosesAt:{
		type:Date
	},
	strOpenPresent:{
		type:Date
	},
	strOpenDetails:{
		type:String
	},
	conductBeginAt:{
		type:Date
	},
	conductClosesAt:{
		type:Date
	},
	strOpenDetails:{
		type:String
	},
	closeBeginAt:{
		type:Date
	},
	closeCloseAt:{
		type:Date
	},
	strClosePresent:{
		type:String
	},
	strDetails:{
		type:String
	}


	
});
AuditPlanSchema.plugin(autoIncrement.plugin, 'AuditPlan');
// AuditPlanSchema.plugin(unique, { message: 'That strCode is already taken.' });
module.exports = mongoose.model('AuditPlan', AuditPlanSchema)