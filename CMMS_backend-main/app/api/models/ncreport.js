const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const AuditReportSchema = new Schema({
	intAuditId: {
		type: Number
	},
	strNameNC: {
		type: String
	},
	dateReport: {
		type: Date
	},
	strDepartmentVessel: {
		type: String
	},
	strSateNC: {
		type: String
	},
	strWhatISM: {
		type: String
	},
	strWhatSMS: {
		type: String
	},
	strWhatProposedCorrective: {
		type: String
	},
	strImmediateAction: {
		type: String
	},
	strNamesPersonsCorrectNC: {
		type: String
	},
	dateCompletion1: {
		type: Date
	},
	strFutherActions: {
		type: String
	},
	strNamePersonCorrectNC: {
		type: String
	},
	dateCompletion2: {
		type: Date
	},
	strVerificationCorrectiveAction: {
		type: String
	},
	strFollowDetails: {
		type: String
	},
	strCorrectiveActionsClosedOut: {
		type: String
	},
	dtmDateCreated: {
		type: Date,
		default: Date.now,
	},
});
AuditReportSchema.plugin(autoIncrement.plugin, 'AuditReport');
// AuditPlanSchema.plugin(unique, { message: 'That strCode is already taken.' });
module.exports = mongoose.model('AuditReport', AuditReportSchema)