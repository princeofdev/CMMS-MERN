const moment = require("moment");
const workOrderModel = require("../models/workorder");
const assetModel = require("../models/assets");
const projectModel = require("../models/project");
const userModel = require("../models/users");
const workordertaskModel = require("../models/workordertask");
const workorderbusinessModel = require("../models/workorderbusiness");
const entryVesselListModel = require("../models/entryvessellist");
const logNotificationModel = require("../models/lognotification");
const workOrderNotificationModel = require("../models/workordernotification");
const scheduledNotificationModel = require("../models/scheduledmaintenancenotification");
const scheduledtaskModel=require("../models/scheduledtask");
const sheduledmaintenanceLogModel = require("../models/scheduledmaintenancelog");
const assetUserModel = require("../models/assetuser");

const { sendEmail}=require("../utils");
// const workordernotification = require("../models/workordernotification");
const workorderStatus_array = {
  2: 'Requested',
  3: 'Assigned',
  4: 'Open',
  5: 'Work In Progress',
  6: 'On Hold',
  7: 'Closed, Completed',
  8: 'Draft',
  9: 'Closed, Incomplete',
  10: 'Other',
};

module.exports = {
  getById: async function (req, res, next) {  

    // console.log(sendEmail(req.userEmail,'Seafair SMS Notification','Schedule maintenace (SM#5) is offline.'));

    await workOrderModel.findById(
      req.params.Id,
      async function (err, workorder) {
        if (err) {
          res.status(400).json({ msg: "Not  found" });
        } else {
          //  let workOrderStatus=await workOrderStatusModel.findById(workorder.intWorkOrderStatusID).exec();
          // let Asset=await assetModel.findById(workorder.strAssetIds).exec();
          let project = await projectModel
            .findById(workorder.intProjectId)
            .exec();
          let completedUser = await userModel
            .findById(
              workorder.intCompletedByUserID == ""
                ? null
                : workorder.intCompletedByUserID
            )
            .exec();
          let assignedUser = await userModel
            .findById(
              workorder.intAssignedUserId == ""
                ? null
                : workorder.intAssignedUserId
            )
            .exec();

          let result = {};
          result.workorder = workorder == null ? {} : workorder;
          result.asset = {};
          result.project = project == null ? {} : project;
          result.completedUser = completedUser == null ? {} : completedUser;
          result.assignedUser = assignedUser == null ? {} : assignedUser;
          res.status(200).json({ msg: "Found!", data: result });
        }
      }
    );
  },
  getPrintDataById: async function (req, res, next) {
    await workOrderModel.findById(
      req.params.Id,
      async function (err, workorder) {
        if (err) {
          res.status(400).json({ msg: "Not  found" });
        } else {
          let project = await projectModel
            .findById(workorder.intProjectId)
            .exec();
          let completedUser = await userModel
            .findById(
              workorder.intCompletedByUserID == ""
                ? null
                : workorder.intCompletedByUserID
            )
            .exec();
          let assignedUser = await userModel
            .findById(
              workorder.intAssignedUserId == ""
                ? null
                : workorder.intAssignedUserId
            )
            .exec();
          let workorderbusiness = await workorderbusinessModel
            .find({ intWorkOrderID: req.params.Id })
            .exec();

          let laborTask = await workordertaskModel
            .find({ intWorkOrderID: req.params.Id })
            .populate("intAssetID")
            .populate("intAssignedToUserID")
            .exec();

          let result = {};
          result.workorder = workorder;
          result.asset = {};
          result.project = project == null ? {} : project;
          result.completedUser = completedUser == null ? {} : completedUser;
          result.assignedUser = assignedUser == null ? {} : assignedUser;
          result.laborTask = laborTask;
          result.business = workorderbusiness;
          res.status(200).json({ msg: "Found!", data: result });
        }
      }
    );
  },
  getAll: function (req, res, next) {
    workOrderModel
      .find({})
      // ..and populate all of the notes associated with it
      // .populate("strAssetIds")
      .populate("intCompletedByUserID")
      .populate("intAssignedUserId")
      .populate("intRequestedByUserID")
      .sort({ dtmEstimatedStartDate: -1 })
      .then(function (data) {
        // If we were able to successfully find an Product with the given id, send it back to the client
        res.status(200).json({ msg: "Found!", data: data });
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.status(500).json({ msg: "Internal Server error" });
      });
  },

  getAllBySmId:function (req,res,next){
    workOrderModel
      .find({ intScheduledMaintenanceID: req.params.Id})
      .sort({ dtmDateCreated: 1 })
      .then(function (data) {
        // If we were able to successfully find an Product with the given id, send it back to the client
        res.status(200).json({ msg: "Found!", data: data });
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.status(500).json({ msg: "Internal Server error" });
      });

  },
  updateById: function (req, res, next) {
    var workorder = {};
    if (req.body.intPriorityID !== undefined)
      workorder.intPriorityID = req.body.intPriorityID;
    if (req.body.intWorkOrderStatusID !== undefined)
      workorder.intWorkOrderStatusID = req.body.intWorkOrderStatusID;
    if (req.body.intSiteID !== undefined)
      workorder.intSiteID = req.body.intSiteID;
    if (req.body.intRequestedByUserID !== undefined)
      workorder.intRequestedByUserID = req.body.intRequestedByUserID;
    if (req.body.strEmailUserGuest !== undefined)
      workorder.strEmailUserGuest = req.body.strEmailUserGuest;
    // if (req.body.dtmDateCreated !== undefined)
    // workorder.dtmDateCreated=req.body.dtmDateCreated;
    if (req.body.dtmDateCompleted !== undefined)
      workorder.dtmDateCompleted = req.body.dtmDateCompleted;
    if (req.body.intCompletedByUserID !== undefined)
      workorder.intCompletedByUserID = req.body.intCompletedByUserID;
    if (req.body.strDescription !== undefined)
      workorder.strDescription = req.body.strDescription;
    if (req.body.intEstimatedHour !== undefined)
      workorder.intEstimatedHour = req.body.intEstimatedHour;
    if (req.body.intActualHour !== undefined)
      workorder.intActualHour = req.body.intActualHour;
    if (req.body.strNameUserGuest !== undefined)
      workorder.strNameUserGuest = req.body.strNameUserGuest;
    if (req.body.dtmSuggestedCompletionDate !== undefined)
      workorder.dtmSuggestedCompletionDate =
        req.body.dtmSuggestedCompletionDate;
    if (req.body.strPhoneUserGuest !== undefined)
      workorder.strPhoneUserGuest = req.body.strPhoneUserGuest;
    // if (req.body.strCode !== undefined)
    // workorder.strCode=req.body.strCode;
    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.intMaintenanceTypeID !== undefined)
      workorder.intMaintenanceTypeID = req.body.intMaintenanceTypeID;
    if (req.body.dtmDateLastModified !== undefined)
      workorder.dtmDateLastModified = req.body.dtmDateLastModified;
    if (req.body.strAdminNotes !== undefined)
      workorder.strAdminNotes = req.body.strAdminNotes;
    if (req.body.intRCAActionID !== undefined)
      workorder.intRCAActionID = req.body.intRCAActionID;
    if (req.body.intRCACauseID !== undefined)
      workorder.intRCACauseID = req.body.intRCACauseID;
    if (req.body.intRCAProblemID !== undefined)
      workorder.intRCAProblemID = req.body.intRCAProblemID;
    if (req.body.intProjectId !== undefined)
      workorder.intProjectId = req.body.intProjectId;
    if (req.body.strAssetIds !== undefined)
      workorder.strAssetIds = req.body.strAssetIds;
    if (req.body.strAssignedUsers !== undefined)
      workorder.strAssignedUsers = req.body.strAssignedUsers;
    if (req.body.intAssignedUserId !== undefined)
      workorder.intAssignedUserId = req.body.intAssignedUserId;
    if (req.body.dblTimeEstimatedHours !== undefined)
      workorder.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
    if (req.body.dblTimeSpentHours !== undefined)
      workorder.dblTimeSpentHours = req.body.dblTimeSpentHours;
    if (req.body.strAssets !== undefined)
      workorder.strAssets = req.body.strAssets;
    if (req.body.dtmEstimatedStartDate != undefined)
      workorder.dtmEstimatedStartDate = req.body.dtmEstimatedStartDate;
    if (req.body.dtmEstimatedStartTime != undefined)
      workorder.dtmEstimatedStartTime = req.body.dtmEstimatedStartTime;
    if (req.body.estimatedCompletionTime != undefined)
      workorder.estimatedCompletionTime = req.body.estimatedCompletionTime;

    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.problem !== undefined) workorder.strProblem = req.body.problem;
    if (req.body.rootCause !== undefined)
      workorder.strRootCause = req.body.rootCause;
    if (req.body.solution !== undefined)
      workorder.strSolution = req.body.solution;
    if (req.body.strReference !== undefined)
      workorder.strReference = req.body.strReference;
    workorder.strWorkInstruction = req.body.strWorkInstruction;


    workOrderModel.findByIdAndUpdate(
      req.params.Id,
      workorder,
     async function (err, movieInfo) {      
        let orderDate = moment(new Date()).format("YYYY-MM-DD");
        var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.crewComplement = "[]";
        dataInf.weather = "[]";
        dataInf.timePeriod = "";
        dataInf.orderDate = orderDate;
        if (err) res.status(400).json({ msg: "Update failed!" });
        else {
 
          var userLists = await workOrderNotificationModel.find({ intWorkOrderID: req.params.Id })
            .populate("intUserId")
            .exec();
          
          var mailContent = "";
          if ( movieInfo.intWorkOrderStatusID !== req.body.intWorkOrderStatusID) {                    
            var recipients = [];
            userLists.map((row) => {
             if(row.bolStatusChange)
              recipients.push(row.intUserId.strEmailAddress);
            })
            mailContent = "Work Order WO# " + req.params.Id + " - " + req.body.strAssets + " - Created on " + moment(movieInfo.dtmDateCreated).format("MMMM Do YYYY") + " has been " + workorderStatus_array[req.body.intWorkOrderStatusID];

            if(recipients.length>0)
            sendEmail(recipients, "", mailContent);

            if ( req.body.intWorkOrderStatusID == 7 ||  req.body.intWorkOrderStatusID == 9 ) {             
           
              var recipients = [];
              userLists.map((row) => {
                if (row.bolWorkOrderCompletion)
                  recipients.push(row.intUserId.strEmailAddress);
              })
              mailContent = "Work Order WO# " + req.params.Id + " - " + req.body.strAssets + " - Created on " + moment(movieInfo.dtmDateCreated).format("MMMM Do YYYY") + " has been completed";

              if (recipients.length > 0)
                sendEmail(recipients, "", mailContent);

              entryVesselListModel.findOne(
                { orderDate: orderDate },
                function (err, result) {
                  var log_array = [];
                  var log_tmp = {};
                  log_tmp.key = 1;
                  log_tmp.strTime = moment(new Date());
                  log_tmp.strCode = "";
                  log_tmp.strExplanation =
                    "Work Order (WO# " + req.params.Id + ") has been completed.";
                  log_array.push(log_tmp);
                  console.log(result, "this is result");
                  if (result == null) {
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.create(dataInf, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else console.log("created===========");
                    });
                  } else {
                    dataInf = result;
                    log_array = JSON.parse(result.logEntries);
                    log_array.push(log_tmp);
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.findByIdAndUpdate(
                      result._id,
                      dataInf,
                      function (err, movieInfo) {
                        if (err) console.log(err, "update error");
                        else {
                          console.log("updated=============");
                        }
                      }
                    );
                  }
                }
              );
            }

            var logInf = {};
            logInf.strSubject = "Work order 'WO# " + req.params.Id + "' has been " + workorderStatus_array[req.body.intWorkOrderStatusID];
            logInf.intRecipientId = workorder.intRequestedByUserID;
            logInf.intLogType = 0;
            logInf.intWorkOrderId = req.params.Id;
            logNotificationModel.create(logInf, function (err, logResult) {
            });

            entryVesselListModel.findOne(
              { orderDate: orderDate },
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
                log_tmp.key = 1;
                log_tmp.strTime = moment(new Date());
                log_tmp.strCode = "";
                log_tmp.strExplanation =
                  "Work Order (WO# " +
                  req.params.Id +
                  ") Status Changed to " +
                  workorderStatus_array[req.body.intWorkOrderStatusID];
                log_array.push(log_tmp);               
                if (result == null) {
                  dataInf.logEntries = JSON.stringify(log_array);
                  entryVesselListModel.create(dataInf, function (err, result) {
                    if (err) {
                      console.log(err);
                    } else console.log("created===========");
                  });
                } else {
                  dataInf = result;
                  log_array = JSON.parse(result.logEntries);
                  log_array.push(log_tmp);
                  dataInf.logEntries = JSON.stringify(log_array);
                  entryVesselListModel.findByIdAndUpdate(
                    result._id,
                    dataInf,
                    function (err, movieInfo) {
                      if (err) console.log(err, "update error");
                      else {
                        console.log("updated=============");
                      }
                    }
                  );
                }
              }
            );


          }
          if (movieInfo.intAssignedUserId != req.body.intAssignedUserId){
            var recipients = [];
           

            console.log(movieInfo.intAssignedUserId, req.userId,'fgggggggg')
           if (movieInfo.intAssignedUserId==req.userId){
             console.log('ddd equal')
             userLists.map((row) => {
               if (row.bolAssign && row.intUserId._id == req.userId)
                 recipients.push(row.intUserId.strEmailAddress);
             })
             mailContent = "Work Order WO# " + req.params.Id + " - " + req.body.strAssets + " - Created on " + moment(movieInfo.dtmDateCreated).format("MMMM Do YYYY")+ " has been assigned to " + req.body.strAssignedUsers;
            }
           else{
             userLists.map((row) => {
               if (row.bolAssign && row.intUserId._id == req.body.intAssignedUserId)
                 recipients.push(row.intUserId.strEmailAddress);
             })
             mailContent = "Work Order WO# " + req.params.Id + " - " + req.body.strAssets + " - Created on " + moment(movieInfo.dtmDateCreated).format("MMMM Do YYYY") + " has been assigned to you";
           }
            if (recipients.length > 0)
              sendEmail(recipients, "", mailContent);
          }
          res.status(200).json({ msg: "Updated successfully!", data: null });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    workOrderModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
      if (err) res.status(400).json({ msg: "Delete failed!" });
      else {
        res.status(200).json({ msg: "Deleted successfully!", data: null });
      }
    });
  },

  create: function (req, res, next) {
    var workorder = {};
    if (req.body.intPriorityID !== undefined)
      workorder.intPriorityID = req.body.intPriorityID;
    if (req.body.intWorkOrderStatusID !== undefined)
      workorder.intWorkOrderStatusID = req.body.intWorkOrderStatusID;
    if (req.body.intSiteID !== undefined)
      workorder.intSiteID = req.body.intSiteID;
    if (req.body.intRequestedByUserID !== undefined)
      workorder.intRequestedByUserID = req.body.intRequestedByUserID;
    if (req.body.strEmailUserGuest !== undefined)
      workorder.strEmailUserGuest = req.body.strEmailUserGuest;
    // if (req.body.dtmDateCreated !== undefined)
    // 	workorder.dtmDateCreated=req.body.dtmDateCreated;
    if (req.body.dtmDateCompleted !== undefined)
      workorder.dtmDateCompleted = req.body.dtmDateCompleted;
    if (req.body.intCompletedByUserID !== undefined)
      workorder.intCompletedByUserID = req.body.intCompletedByUserID;
    if (req.body.strDescription !== undefined)
      workorder.strDescription = req.body.strDescription;
    if (req.body.intEstimatedHour !== undefined)
      workorder.intEstimatedHour = req.body.intEstimatedHour;
    if (req.body.intActualHour !== undefined)
      workorder.intActualHour = req.body.intActualHour;
    if (req.body.strNameUserGuest !== undefined)
      workorder.strNameUserGuest = req.body.strNameUserGuest;
    if (req.body.dtmSuggestedCompletionDate !== undefined)
      workorder.dtmSuggestedCompletionDate =
        req.body.dtmSuggestedCompletionDate;
    if (req.body.strPhoneUserGuest !== undefined)
      workorder.strPhoneUserGuest = req.body.strPhoneUserGuest;
    if (req.body.strCode !== undefined) workorder.strCode = req.body.strCode;
    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.intMaintenanceTypeID !== undefined)
      workorder.intMaintenanceTypeID = req.body.intMaintenanceTypeID;
    if (req.body.dtmDateLastModified !== undefined)
      workorder.dtmDateLastModified = req.body.dtmDateLastModified;
    if (req.body.strAdminNotes !== undefined)
      workorder.strAdminNotes = req.body.strAdminNotes;
    if (req.body.intRCAActionID !== undefined)
      workorder.intRCAActionID = req.body.intRCAActionID;
    if (req.body.intRCACauseID !== undefined)
      workorder.intRCACauseID = req.body.intRCACauseID;
    if (req.body.intRCAProblemID !== undefined)
      workorder.intRCAProblemID = req.body.intRCAProblemID;
    if (req.body.strAssignedUsers !== undefined)
      workorder.strAssignedUsers = req.body.strAssignedUsers;
    if (req.body.strAssetIds !== undefined)
      workorder.strAssetIds =
        req.body.strAssetIds == null ? "" : req.body.strAssetIds;
    if (req.body.intProjectId !== undefined)
      workorder.intProjectId = req.body.intProjectId;
    if (req.body.intAssignedUserId !== undefined)
      workorder.intAssignedUserId = req.body.intAssignedUserId;
    if (req.body.dblTimeEstimatedHours !== undefined)
      workorder.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
    if (req.body.dblTimeSpentHours !== undefined)
      workorder.dblTimeSpentHours = req.body.dblTimeSpentHours;
    if (req.body.strAssets !== undefined)
      workorder.strAssets =
        req.body.strAssets == null ? "" : req.body.strAssets;
    if (req.body.dtmEstimatedStartDate != undefined)
      workorder.dtmEstimatedStartDate = req.body.dtmEstimatedStartDate;
    if (req.body.dtmEstimatedStartTime != undefined)
      workorder.dtmEstimatedStartTime = req.body.dtmEstimatedStartTime;
    if (req.body.estimatedCompletionTime != undefined)
      workorder.estimatedCompletionTime = req.body.estimatedCompletionTime;

    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.problem !== undefined) workorder.strProblem = req.body.problem;
    if (req.body.rootCause !== undefined)
      workorder.strRootCause = req.body.rootCause;
    if (req.body.solution !== undefined)
      workorder.strSolution = req.body.solution;
    if (req.body.strReference !== undefined)
      workorder.strReference = req.body.strReference;
    workorder.strWorkInstruction = req.body.strWorkInstruction;

    workOrderModel.create(workorder, async function (err, result) {      
      if (err) {
        if (err.errors) {
          if (err.errors.intWorkOrderStatusID) {
            res
              .status(400)
              .json({ msg: err.errors.intWorkOrderStatusID.message });
            return;
          } else if (err.errors.intSiteID) {
            res.status(400).json({ msg: err.errors.intSiteID.message });
            return;
          }
        }
        console.log(err);
        res.status(400).json({ msg: "Saved failed", data: null });
      } else {
        workorder.strCode = "WO# " + result._id;       
        let orderDate = moment(new Date()).format("YYYY-MM-DD");
         var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.crewComplement = "[]";
        dataInf.weather = "[]";
        dataInf.timePeriod = "";
        dataInf.orderDate = orderDate;        
        var createdId=result._id;


        var data = {};
        data.intWorkOrderID = result._id;
        data.intUserId = req.userId;
        // data.strUserEmail = req.userEmail;
        data.bolAssign = true;
        data.bolStatusChange = true;
        data.bolWorkOrderCompletion = true;
        data.bolTaskCompletion = true;
        data.bolAssetOnline = true;
        data.strAssetIds = req.body.strAssetIds;

        await workOrderNotificationModel.create(data, function (err, logResult) {
        });

        var temp = req.body.strAssetIds.split(",");
        temp.map(async (row, index) => {
          var persons = await assetUserModel.find({ intAssetID: row }).exec();
          persons.map(async (persion) => {
            // notificationUsers.push(persion.intUserID.toString());
            if (req.userId != persion.intUserID.toString()) {
              data.intUserId = persion.intUserID.toString();
              await workOrderNotificationModel.create(data, function (err, logResult) {
              });
            }
          })
        })

        workOrderModel.findByIdAndUpdate(
          result._id,
          workorder,
          function (err, movieInfo) {
            if (err) res.status(400).json({ msg: "Created failed!" });
            else {
              var logInf = {};
              logInf.strSubject = "Work order '" + workorder.strCode + "' has been " + workorderStatus_array[workorder.intWorkOrderStatusID];
              logInf.intRecipientId = workorder.intRequestedByUserID;
              logInf.intLogType = 0;
              logInf.intWorkOrderId = createdId;
              logNotificationModel.create(logInf, function (err, logResult) {
              });           
              
              entryVesselListModel.findOne(
                { orderDate: orderDate },
                function (err, result) {
                  var log_array = [];
                  var log_tmp = {};
                  log_tmp.key = 1;
                  log_tmp.strTime = moment(new Date());
                  log_tmp.strCode = "";
                  log_tmp.strExplanation =
                    "Work Order (" +
                    workorder.strCode +
                    ") is created by " +
                    workorder.strAssignedUsers;
                  log_array.push(log_tmp);
                  console.log(result, "this is result");
                  if (result == null) {
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.create(
                      dataInf,
                      function (err, result) {
                        if (err) {
                          console.log(err);
                        } else console.log("created===========");
                      }
                    );
                  } else {
                    dataInf = result;
                    log_array = JSON.parse(result.logEntries);
                    log_array.push(log_tmp);
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.findByIdAndUpdate(
                      result._id,
                      dataInf,
                      function (err, movieInfo) {
                        if (err) console.log(err, "update error");
                        else {
                          console.log("updated=============");
                        }
                      }
                    );
                  }
                }
              );
              res.status(200).json({
                msg: "Created successfully!",
                data: { id: createdId },
              });
            }
          }
        );
      }
    });
  },
  createNumberId: function (req, res, next) {  
    workOrderModel.find({}, function (err, result) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error." });
      } else {
        res.status(200).json({ msg: "List found!", data: result });
      }
    }).sort({ _id: -1 });

  },
  createClone: function (req, res, next) {
    var workorder = {};
    if (req.body.intPriorityID !== undefined)
      workorder.intPriorityID = req.body.intPriorityID;
    if (req.body.intWorkOrderStatusID !== undefined)
      workorder.intWorkOrderStatusID = req.body.intWorkOrderStatusID;
    if (req.body.intSiteID !== undefined)
      workorder.intSiteID = req.body.intSiteID;
    if (req.body.intRequestedByUserID !== undefined)
      workorder.intRequestedByUserID = req.body.intRequestedByUserID;
    if (req.body.strEmailUserGuest !== undefined)
      workorder.strEmailUserGuest = req.body.strEmailUserGuest;
    // if (req.body.dtmDateCreated !== undefined)
    // 	workorder.dtmDateCreated=req.body.dtmDateCreated;
    if (req.body.dtmDateCompleted !== undefined)
      workorder.dtmDateCompleted = req.body.dtmDateCompleted;
    if (req.body.intCompletedByUserID !== undefined)
      workorder.intCompletedByUserID = req.body.intCompletedByUserID;
    if (req.body.strDescription !== undefined)
      workorder.strDescription = req.body.strDescription;
    if (req.body.intEstimatedHour !== undefined)
      workorder.intEstimatedHour = req.body.intEstimatedHour;
    if (req.body.intActualHour !== undefined)
      workorder.intActualHour = req.body.intActualHour;
    if (req.body.strNameUserGuest !== undefined)
      workorder.strNameUserGuest = req.body.strNameUserGuest;
    if (req.body.dtmSuggestedCompletionDate !== undefined)
      workorder.dtmSuggestedCompletionDate =
        req.body.dtmSuggestedCompletionDate;
    if (req.body.strPhoneUserGuest !== undefined)
      workorder.strPhoneUserGuest = req.body.strPhoneUserGuest;
    if (req.body.strCode !== undefined) workorder.strCode = req.body.strCode;
    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.intMaintenanceTypeID !== undefined)
      workorder.intMaintenanceTypeID = req.body.intMaintenanceTypeID;
    if (req.body.dtmDateLastModified !== undefined)
      workorder.dtmDateLastModified = req.body.dtmDateLastModified;
    if (req.body.strAdminNotes !== undefined)
      workorder.strAdminNotes = req.body.strAdminNotes;
    if (req.body.intRCAActionID !== undefined)
      workorder.intRCAActionID = req.body.intRCAActionID;
    if (req.body.intRCACauseID !== undefined)
      workorder.intRCACauseID = req.body.intRCACauseID;
    if (req.body.intRCAProblemID !== undefined)
      workorder.intRCAProblemID = req.body.intRCAProblemID;
    if (req.body.strAssignedUsers !== undefined)
      workorder.strAssignedUsers = req.body.strAssignedUsers;
    if (req.body.strAssetIds !== undefined)
      workorder.strAssetIds =
        req.body.strAssetIds == null ? "" : req.body.strAssetIds;
    if (req.body.intProjectId !== undefined)
      workorder.intProjectId = req.body.intProjectId;
    if (req.body.intAssignedUserId !== undefined)
      workorder.intAssignedUserId = req.body.intAssignedUserId;
    if (req.body.dblTimeEstimatedHours !== undefined)
      workorder.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
    if (req.body.dblTimeSpentHours !== undefined)
      workorder.dblTimeSpentHours = req.body.dblTimeSpentHours;
    if (req.body.strAssets !== undefined)
      workorder.strAssets =
        req.body.strAssets == null ? "" : req.body.strAssets;
    if (req.body.dtmEstimatedStartDate != undefined)
      workorder.dtmEstimatedStartDate = req.body.dtmEstimatedStartDate;
    if (req.body.dtmEstimatedStartTime != undefined)
      workorder.dtmEstimatedStartTime = req.body.dtmEstimatedStartTime;
    if (req.body.estimatedCompletionTime != undefined)
      workorder.estimatedCompletionTime = req.body.estimatedCompletionTime;

    if (req.body.strCompletionNotes !== undefined)
      workorder.strCompletionNotes = req.body.strCompletionNotes;
    if (req.body.problem !== undefined) workorder.strProblem = req.body.problem;
    if (req.body.rootCause !== undefined)
      workorder.strRootCause = req.body.rootCause;
    if (req.body.solution !== undefined)
      workorder.strSolution = req.body.solution;
    if (req.body.strReference !== undefined)
      workorder.strReference = req.body.strReference;
    workorder.strWorkInstruction = req.body.strWorkInstruction;

    workorder.intScheduledMaintenanceID = req.body.intScheduledMaintenanceID;

    workOrderModel.create(workorder, function (err, result) {
      if (err) {
        if (err.errors) {
          if (err.errors.intWorkOrderStatusID) {
            res
              .status(400)
              .json({ msg: err.errors.intWorkOrderStatusID.message });
            return;
          } else if (err.errors.intSiteID) {
            res.status(400).json({ msg: err.errors.intSiteID.message });
            return;
          }
        }
        console.log(err);
        res.status(400).json({ msg: "Saved failed", data: null });
      } else {
        workorder.strCode = "WO# " + result._id;
        let orderDate = moment(new Date()).format("YYYY-MM-DD");
        var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.crewComplement = "[]";
        dataInf.weather = "[]";
        dataInf.timePeriod = "";
        dataInf.orderDate = orderDate;
        var createdId = result._id;
        workOrderModel.findByIdAndUpdate(
          result._id,
          workorder,
         async function (err, movieInfo) {
            if (err) res.status(400).json({ msg: "Created failed!" });
            else {           
              let sheduleNotification = await scheduledNotificationModel
                .find({ intScheduledMaintenanceID: req.body.intScheduledMaintenanceID })                
                .exec();

              sheduleNotification.map(async(row,index)=>{
                var temp={};
                temp.intWorkOrderID=result._id;
                temp.intUserId = row.intUserId;
                temp.strUserEmail = row.strUserEmail;
                temp.bolAssign = row.bolAssign;
                temp.bolStatusChange = row.bolStatusChange;
                temp.bolWorkOrderCompletion = row.bolWorkOrderCompletion;
                temp.bolTaskCompletion = row.bolTaskCompletion;
                temp.bolAssetOnline = row.bolAssetOnline;
                temp.strAssetIds = row.strAssetIds;
                await workOrderNotificationModel.create(temp);
              })

              let scheduledTasks = await scheduledtaskModel.find({ intScheduledMaintenanceID: req.body.intScheduledMaintenanceID}).exec();
              scheduledTasks.map(async(row)=>{
                var temp={};
                temp.intTaskType = row.intTaskType;
                temp.dblTimeEstimatedHours = row.dblTimeEstimatedHours;
                temp.intAssignedToUserID = row.intAssignedToUserID;
                temp.intMeterReadingUnitID = row.intMeterReadingUnitID;
                temp.intAssetID = row.intAssetID;
                temp.intParentWorkOrderTaskID = row.intParentScheduledTaskID;
                temp.intWorkOrderID = result._id;
                temp.strDescription = row.strDescription;
                temp.strResult = row.strResult;
                await workordertaskModel.create(temp);

              });

              var logInf = {};
              logInf.strSubject = "Work order '" + workorder.strCode + "' has been " + workorderStatus_array[workorder.intWorkOrderStatusID];
              logInf.intRecipientId = workorder.intRequestedByUserID;
              logInf.intLogType = 0;
              logInf.intWorkOrderId = createdId;
              logNotificationModel.create(logInf, function (err, logResult) {
              });

              entryVesselListModel.findOne(
                { orderDate: orderDate },
                function (err, result) {
                  var log_array = [];
                  var log_tmp = {};
                  log_tmp.key = 1;
                  log_tmp.strTime = moment(new Date());
                  log_tmp.strCode = "";
                  log_tmp.strExplanation =
                    "Work Order (" +
                    workorder.strCode +
                    ") is created by " +
                    workorder.strAssignedUsers;
                  log_array.push(log_tmp);
                  console.log(result, "this is result");
                  if (result == null) {
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.create(
                      dataInf,
                      function (err, result) {
                        if (err) {
                          console.log(err);
                        } else console.log("created===========");
                      }
                    );
                  } else {
                    dataInf = result;
                    log_array = JSON.parse(result.logEntries);
                    log_array.push(log_tmp);
                    dataInf.logEntries = JSON.stringify(log_array);
                    entryVesselListModel.findByIdAndUpdate(
                      result._id,
                      dataInf,
                      function (err, movieInfo) {
                        if (err) console.log(err, "update error");
                        else {
                          console.log("updated=============");
                        }
                      }
                    );
                  }
                }
              );

              var smLog = {};
              smLog.intScheduledMaintenanceID = result._id;
              smLog.strLogType = "Create Work Order";
              smLog.strStatus = "Success";
              smLog.intUserId = req.userId;
              smLog.strNote
              sheduledmaintenanceLogModel.create(smLog, function (err, logResult) {
              });

              res.status(200).json({
                msg: "Created successfully!",
                data: { id: createdId },
              });
            }
          }
        );
      }
    });
  },
};
