
const auditReportModel = require('../models/auditreport');					

module.exports = {
	getById: function(req, res, next) {	
		auditReportModel
			.findById(req.params.Id)
			.populate("intDepartmentVessel")
			.populate("intAuditor")
			.populate("intAuditorAuditee")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},

	getAll: function(req, res, next) {
		auditReportModel
			.find()
			.populate("intDepartmentVessel")
			.populate("intAuditor")
			.populate("intAuditorAuditee")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});	
	},

	updateById: function(req, res, next) {
		
		var data={};
		data.strInternalSmsAuditReport = req.body.strInternalSmsAuditReport;
		data.aDate = req.body.aDate;
		data.intDepartmentVessel = req.body.intDepartmentVessel;
		data.strAuditNo = req.body.strAuditNo;
		data.intAuditor = req.body.intAuditor;
		data.strNCRCARNo = req.body.strNCRCARNo;
		data.intAuditorAuditee = req.body.intAuditorAuditee;
		data.strISMReference = req.body.strISMReference;
		data.strSMSReference = req.body.strSMSReference;
		data.strNCStatement = req.body.strNCStatement;
		data.strImmediateAction = req.body.strImmediateAction;
		data.aImmediateCompletionDate = req.body.aImmediateCompletionDate;
		data.strFurtherAction = req.body.strFurtherAction;
		data.aFurtherCompletionDate = req.body.aFurtherCompletionDate;
		data.strFollowUpDetail = req.body.strFollowUpDetail;
		data.strCorrectiveAction = req.body.strCorrectiveAction;
		auditReportModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		auditReportModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.strInternalSmsAuditReport = req.body.strInternalSmsAuditReport;
		data.aDate = req.body.aDate;
		data.intDepartmentVessel = req.body.intDepartmentVessel;
		data.strAuditNo = req.body.strAuditNo;
		data.intAuditor = req.body.intAuditor;
		data.strNCRCARNo = req.body.strNCRCARNo;
		data.intAuditorAuditee = req.body.intAuditorAuditee;

		data.strISMReference = req.body.strISMReference;
		data.strSMSReference = req.body.strSMSReference;
		data.strNCStatement = req.body.strNCStatement;
		data.strImmediateAction = req.body.strImmediateAction;
		data.aImmediateCompletionDate = req.body.aImmediateCompletionDate;
		data.strFurtherAction = req.body.strFurtherAction;
		data.aFurtherCompletionDate = req.body.aFurtherCompletionDate;
		data.strFollowUpDetail = req.body.strFollowUpDetail;
		data.strCorrectiveAction = req.body.strCorrectiveAction;
		data.intRequestedUserId = req.userId;
		
	
		auditReportModel.create(data, function (err, result) {
			if (err) {					
				// if (err.errors) {	
				// 	if (err.errors.strName) {
				// 		res.status(400).json({ msg: err.errors.strName.message });
				// 		return;
				// 	}						
				// }
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					