

const scheduledmaintenanceModel = require('../models/scheduledmaintenance');
const SchedulTriggerModel = require('../models/scheduletrigger');
const ScheduledTaskModel = require('../models/scheduledtask');
const logNotificationModel = require("../models/lognotification");
const sheduledmaintenanceLogModel = require("../models/scheduledmaintenancelog");
const ScheduledNotificationModel = require("../models/scheduledmaintenancenotification");
const assetUserModel=require("../models/assetuser");
module.exports = {
	getById: async function (req, res, next) {

		scheduledmaintenanceModel.findById(req.params.Id)
			// ..and populate all of the notes associated with it
			// .populate("intSiteID")
			.populate("intAssignedToUserID")
			.populate("intProjectID")
			.populate("intAccountID")
			.populate("intChargeDepartmentID")
			.then(function (data) {
				// If we were able to successfully find an Product with the given id, send it back to the client
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.status(500).json({ msg: "Internal Server error" });
			});

	},

	getAll: function (req, res, next) {

		scheduledmaintenanceModel.find({})
			// ..and populate all of the notes associated with it
			.populate("intSiteID")
			.populate("intAssignedToUserID")
			.then(function (data) {
				// If we were able to successfully find an Product with the given id, send it back to the client
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.status(500).json({ msg: "Internal Server error" });
			});

	},
	getSMLogs: function (req, res, next) {
		sheduledmaintenanceLogModel.find({ intScheduledMaintenanceID: req.params.Id})
			.populate("intUserId")
			.sort({ dtmDate: -1 })
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})			
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			})
	},
	getPrintDataById: async function (req, res, next) {
		await scheduledmaintenanceModel.findById(req.params.Id)
			// ..and populate all of the notes associated with it
			// .populate("intSiteID")
			.populate("intAssignedToUserID")
			.populate("intProjectID")
			.populate("intAccountID")
			.populate("intChargeDepartmentID")
			.then(async function (data) {
				var sm = {};
				let SchedulTrigger = await SchedulTriggerModel.find({ intScheduledMaintenanceID: req.params.Id }).exec();
				let scheduledTask = await ScheduledTaskModel.find({ intScheduledMaintenanceID: req.params.Id })
					.populate("intAssetID")
					.populate("intAssignedToUserID").exec();
				sm.data = data;
				sm.SchedulTrigger = SchedulTrigger;
				sm.scheduledTask = scheduledTask;

				res.status(200).json({ msg: "Found!", data: sm });
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	updateById: function (req, res, next) {
		var data = {};
		data.intPriorityID = req.body.intPriorityID;
		data.intSiteID = req.body.intSiteID;
		data.intStartAsWorkOrderStatusID = req.body.intStartAsWorkOrderStatusID;
		data.intScheduledMaintenanceStatusID = req.body.intScheduledMaintenanceStatusID;
		data.intSuggestedCompletion = req.body.intSuggestedCompletion;
		data.strCode = req.body.strCode;
		data.intProjectID = req.body.intProjectID;
		data.strCompletionNotes = req.body.strCompletionNotes;
		data.intMaintenanceTypeID = req.body.intMaintenanceTypeID;
		data.intRequestorUserID = req.userId;
		data.strDescription = req.body.strDescription;
		data.intAssignedToUserID = req.body.intAssignedToUserID == undefined ? null : req.body.intAssignedToUserID;
		data.intAccountID = req.body.intAccountID;
		data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		data.strWorkInstruction = req.body.strWorkInstruction;
		data.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;

		data.strAssets = req.body.strAssets == null ? "" : req.body.strAssets;
		data.strAssetIds = req.body.strAssetIds == null ? "" : req.body.strAssetIds;
		data.strAssignedUser = req.body.strAssignedUser;
		data.intEstimatedHour = req.body.intEstimatedHour;
		// if(req.body.intAssetParentID==req.params.assetId){
		// 	res.status(400).json({ msg: "Asset cannot be 'a part of' or 'located at' itself" });
		// 	return
		// }

		scheduledmaintenanceModel.findByIdAndUpdate(req.params.Id, data, function (err, previous) {
			if (err) {
				console.log(err);
				res.status(400).json({ msg: "Failed!" });
			}
			else {
				var logInf = {};
				logInf.strSubject = "Scheduled Maintenance 'SM# " + req.params.Id + "' has been updated.";
				logInf.intRecipientId = req.body.intRequestorUserID;
				logInf.intLogType = 3;
				logInf.intScheduledMaintenanceID = req.params.Id;
				logNotificationModel.create(logInf, function (err, logResult) {
				});

				if (previous.intScheduledMaintenanceStatusID != req.body.intScheduledMaintenanceStatusID){
					var smLog = {};
					smLog.intScheduledMaintenanceID = req.params.Id;
					smLog.strLogType = req.body.intScheduledMaintenanceStatusID ? "Activate" :"Deactivate";
					smLog.strStatus = "Success";
					smLog.intUserId = req.userId;
					sheduledmaintenanceLogModel.create(smLog, function (err, logResult) {
					});
				}
				
				

				res.status(200).json({ msg: "Saved successfully!", data: null });
			}
		});
	},

	deleteById: async function (req, res, next) {

		// let finds=	await assetModel.find({ intAssetParentID: req.params.assetId }).exec();	
		// if(finds.length>0){
		// 	res.status(400).json({ msg: "This Asset could not be deleted because there are Assets/Supplies related to it." });
		// }
		// else{
		await scheduledmaintenanceModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				var logInf = {};
				logInf.strSubject = "Scheduled Maintenance 'SM# " + req.params.Id + "' has been deleted.";
				logInf.intRecipientId = req.userId;
				logInf.intLogType = 3;
				logInf.intScheduledMaintenanceID = req.params.Id;
				logNotificationModel.create(logInf, function (err, logResult) {
				});
				res.status(200).json({ msg: "Deleted successfully!", data: null });
			}
		});
		// }



	},

	create: async function (req, res, next) {

		var data = {};
		data.intPriorityID = req.body.intPriorityID;
		data.intSiteID = req.body.intSiteID;
		data.intStartAsWorkOrderStatusID = req.body.intStartAsWorkOrderStatusID;
		data.intScheduledMaintenanceStatusID = req.body.intScheduledMaintenanceStatusID;
		data.intSuggestedCompletion = req.body.intSuggestedCompletion;
		data.strCode = req.body.strCode;
		data.intProjectID = req.body.intProjectID;
		data.strCompletionNotes = req.body.strCompletionNotes;
		data.intMaintenanceTypeID = req.body.intMaintenanceTypeID;
		data.intRequestorUserID = req.body.intRequestorUserID;
		data.strDescription = req.body.strDescription;
		data.intAccountID = req.body.intAccountID;
		data.intChargeDepartmentID = req.body.intChargeDepartmentID;
		data.strWorkInstruction = req.body.strWorkInstruction;
		data.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
		data.strAssets = req.body.strAssets;
		data.strAssetIds = req.body.strAssetIds;
		data.strAssignedUser = req.body.strAssignedUser;
		data.intEstimatedHour = req.body.intEstimatedHour;
		data.intAssignedToUserID = req.body.intAssignedToUserID;

		// data.bolCanFireSMWithOpenWO=req.body.bolCanFireSMWithOpenWO;
		// data.bolWORequiresSignature=req.body.bolWORequiresSignature;

		await scheduledmaintenanceModel.create(data, async function (err, result) {

			if (err) {
				res.status(400).json({ msg: "Creat failed", data: null });
			}
			else {
				var update_sm = {};
				update_sm.strCode = "SM# " + result._id;
				scheduledmaintenanceModel.findByIdAndUpdate(result._id, update_sm,async function (err, update) {
					//console.log(update);
					var logInf = {};
					logInf.strSubject = "Scheduled Maintenance 'SM# " + result._id + "' has been created." ;
					logInf.intRecipientId = req.body.intRequestorUserID;
					logInf.intLogType = 3;
					logInf.intScheduledMaintenanceID = result._id;
					// logNotificationModel.create(logInf, function (err, logResult) {
					// });

					var smLog={};
					smLog.intScheduledMaintenanceID = result._id;
					smLog.strLogType = "Create Scheduled Maintenance";
					smLog.strStatus = "Success";
					smLog.intUserId = req.userId;
					// sheduledmaintenanceLogModel.create(smLog, function (err, logResult) {
					// });

					var data = {};				
					data.intScheduledMaintenanceID = result._id;
					data.intUserId = req.userId;
					// data.strUserEmail = req.userEmail;
					data.bolAssign = true;
					data.bolStatusChange = true;
					data.bolWorkOrderCompletion = true;
					data.bolTaskCompletion = true;
					data.bolAssetOnline = true;
					data.strAssetIds = req.body.strAssetIds;
				
					await ScheduledNotificationModel.create(data,function(err, logResult) {
					 });
					// notificationUsers.push(req.userId);

					var temp = req.body.strAssetIds.split(",");
					temp.map(async(row,index)=>{
						var persons=await assetUserModel.find({ intAssetID:row}).exec();
						persons.map(async(persion)=>{
							// notificationUsers.push(persion.intUserID.toString());
							if (req.userId != persion.intUserID.toString()) {
								data.intUserId = persion.intUserID.toString();
								await ScheduledNotificationModel.create(data, function (err, logResult) {
								});
							}
						})						
					})
					
					res.status(200).json({ msg: "Saved successfully!", data: { id: result._id, strCode: update_sm.strCode } });
				})
			}


		});
	},
	createNumberId: function (req, res, next) {
		scheduledmaintenanceModel.find({}, function (err, result) {
			if (err) {
				res.status(500).json({ msg: "Internal Server error." });
			} else {
				res.status(200).json({ msg: "List found!", data: result });
			}
		}).sort({ _id: -1 });

	},


}