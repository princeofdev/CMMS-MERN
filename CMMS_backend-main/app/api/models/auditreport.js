const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AuditReportSchema = new Schema({
	strInternalSmsAuditReport: {
		type: String
	},
	aDate: {
		type: Date
	},
	intDepartmentVessel: {
		type: Schema.Types.Number,
		ref: "Asset"
	},
	strAuditNo: {
		type: String
	},
	intAuditor: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	intAuditee: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	strNCRCARNo: {
		type: String
	},
	intAuditorAuditee:{
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	strISMReference:{
		type:String
	},
	strSMSReference: {
		type: String
	},
	strNCStatement: {
		type: String
	},
	strImmediateAction: {
		type: String
	},
	aImmediateCompletionDate: {
		type: Date
	},
	strFurtherAction: {
		type: String
	},
	aFurtherCompletionDate: {
		type: Date
	},
	
	strFollowUpDetail: {
		type: String
	},
	strCorrectiveAction: {
		type: String
	},
	isCreatedDate:{
		type:Date,
		default: Date.now,
	},
	intRequestedUserId: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
});
AuditReportSchema.plugin(autoIncrement.plugin, 'AuditReport');
// AuditPlanSchema.plugin(unique, { message: 'That strCode is already taken.' });
module.exports = mongoose.model('AuditReport', AuditReportSchema)