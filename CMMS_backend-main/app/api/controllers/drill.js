const moment = require("moment");
const drillModel = require("../models/drill");
const entrydrillsModel = require("../models/entrydrills");
const entryVesselListModel = require("../models/entryvessellist");
const logNotificationModel = require("../models/lognotification");
module.exports = {
  getById: async function (req, res, next) {
    await drillModel.findById(req.params.Id, async function (err, drill) {
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        let result = drill;
        res.status(200).json({ msg: "Asset found!", data: result });
      }
    });
  },
  getPrintDrill: async function (req, res, next) {
    await drillModel.findById(req.params.Id, async function (err, drill) {
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        let result = drill;
        res.status(200).json({ msg: "Drill found!", data: result });
      }
    });
  },
  getByFilterId: async function (req, res, next) {
    var temp_filterIds = req.params.Id;
    temp_filterIds = temp_filterIds.split(",");
    drillModel.find(
      { intCategoryID: { $in: temp_filterIds } },
      function (err, drills) {
        if (err) {
          res.status(500).json({ msg: "Internal Server error." });
        } else {
          res.status(200).json({ msg: "List found!", data: drills });
        }
      }
    );
  },
  getAll: function (req, res, next) {
    drillModel.find({}, function (err, drills) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error." });
      } else {
        res.status(200).json({ msg: "List found!", data: drills });
      }
    });
  },

  updateById: async function (req, res, next) {
    var drill = {};
    if (req.body.strStatus !== undefined) drill.strStatus = req.body.strStatus;
    if (req.body.strCategory !== undefined)
      drill.strCategory = req.body.strCategory;
    if (req.body.strType !== undefined) drill.strType = req.body.strType;
    if (req.body.strTitle !== undefined) drill.strTitle = req.body.strTitle;
    if (req.body.intEstimatedTime !== undefined)
      drill.intEstimatedTime = req.body.intEstimatedTime;
    if (req.body.aDueDate !== undefined) drill.aDueDate = req.body.aDueDate;
    if (req.body.strGeneralAssignee !== undefined)
      drill.strGeneralAssignee = req.body.strGeneralAssignee;
    if (req.body.strGeneralDescription !== undefined)
      drill.strGeneralDescription = req.body.strGeneralDescription;
    if (req.body.aActionAssignCompletionDate !== undefined)
      drill.aActionAssignCompletionDate = req.body.aActionAssignCompletionDate;
    if (req.body.strActionNarrative !== undefined)
      drill.strActionNarrative = req.body.strActionNarrative;
    if (req.body.strActionNarrativeFuture !== undefined)
      drill.strActionNarrativeFuture = req.body.strActionNarrativeFuture;
    if (req.body.strParticipatingCrewIds !== undefined)
      drill.strParticipatingCrewIds = req.body.strParticipatingCrewIds;
    if (req.body.strCrewLists !== undefined)
      drill.strCrewLists = req.body.strCrewLists;

    drillModel.findByIdAndUpdate(
      req.params.Id,
      drill,
      async function (err, drillInfo) {
        if (err) res.status(400).json({ msg: "Update failed!" });
        else {
          var userLog = {};
          userLog.intRecipientId = req.userId;
          userLog.intLogType = 4;
          userLog.intDrillId = req.params.Id;
          if (drill.strStatus == "complete" || drill.strStatus == "approve") {
            let orderDate = moment(new Date()).format("YYYY-MM-DD");
            var dataInf = {};
            dataInf.orderStatus = "Draft";
            dataInf.revisedDate = "";
            dataInf.printedDate = "";
            dataInf.orderDate = orderDate;          

            await entrydrillsModel.find(
              {},
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
                log_tmp.key = 1;
                log_tmp.strDate = moment(new Date());
                log_tmp.strTime = moment(new Date());
                log_tmp.strLocation = "";

                if (drill.strStatus == "complete") {
                  log_tmp.strDescription =
                    "Drill (" +
                    drillInfo.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ") completed by " +
                    req.body.operationUser +
                    ".";
                  userLog.strSubject = "Drill (" + drillInfo.strCode + ") - (" + req.body.strGeneralDescription + ") has been updated.";
                } else if (drill.strStatus == "approve") {
                  log_tmp.strDescription =
                    "Drill (" +
                    drillInfo.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  approved by " +
                    req.body.operationUser +
                    ".";
                  userLog.strSubject = "Drill (" + drillInfo.strCode + ") - (" + req.body.strGeneralDescription + ") has been approved.";

                }                

                log_array.push(log_tmp);
                logNotificationModel.create(userLog, function (err, logResult) {
                });
                if (result.length == 0) {
                  dataInf.entryDrills = JSON.stringify(log_array);
                  entrydrillsModel.create(dataInf, function (err, result) {
                    if (err) {
                      console.log(err);
                    } else console.log("created===========");
                  });
                } else {
                  var res=result[result.length-1];
                  dataInf = res;
                  log_array = JSON.parse(res.entryDrills);
                  log_array.push(log_tmp);
                  dataInf.entryDrills = JSON.stringify(log_array);
                  entrydrillsModel.findByIdAndUpdate(
                    res._id,
                    dataInf,
                    function (err, movieInfo) {
                      if (err) console.log(err, "update error!.");
                      else {
                        console.log("updated=============");
                      }
                    }
                  );
                }
              }
            ); // end entriDrillmodel
            await entryVesselListModel.findOne(
              { orderDate: orderDate },
              function (err, result) {
                dataInf.printedDate = null;
                dataInf.crewComplement = "[]";
                dataInf.weather = "[]";
                dataInf.timePeriod = "";

                var log_array = [];
                var log_tmp = {};
                log_tmp.key = 1;
                log_tmp.strTime = moment(new Date());
                log_tmp.strCode = "";
                if (drill.strStatus == "complete") {
                  log_tmp.strExplanation =
                    "Drill (" +
                    drillInfo.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ") completed by " +
                    req.body.operationUser +
                    ".";
                } else if (drill.strStatus == "approve") {
                  log_tmp.strExplanation =
                    "Drill (" +
                    drillInfo.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  approved by " +
                    req.body.operationUser +
                    ".";
                }
                log_array.push(log_tmp);

                if (result == null) {
                  dataInf.logEntries = JSON.stringify(log_array);
                  entryVesselListModel.create(dataInf, function (err, result) {
                    if (err) {
                      //   console.log(err);
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
                      if (err) console.log(err, "update error!.");
                      else {
                        console.log("updated=============");
                      }
                    }
                  );
                }
              }
            );
          }
          else{            
            userLog.strSubject = "Drill (" + drillInfo.strCode + ") - (" + drill.strGeneralDescription + ") has been updated.";
            logNotificationModel.create(userLog, function (err, logResult) {
            });

          }
          res.status(200).json({ msg: "Updated successfully!", data: null });
        }
      }
    );
  },

  deleteById: async function (req, res, next) {   

    drillModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
      if (err) res.status(400).json({ msg: "Delete failed!" });
      else {
        var logInf = {};
        logInf.strSubject = "Drill (DR# " + req.params.Id + ") has been deleted.";
        logInf.intRecipientId = req.userId;
        logInf.intLogType = 4;
        logInf.intDrillId = req.params.Id;
        logNotificationModel.create(logInf, function (err, logResult) {
        });
        res.status(200).json({ msg: "Deleted successfully!" });
      }
    });
  },

  create: async function (req, res, next) {
    var drill = {};

    drill.strCode = "strCode";
    if (req.body.strStatus !== undefined) drill.strStatus = req.body.strStatus;
    if (req.body.strCategory !== undefined)
      drill.strCategory = req.body.strCategory;
    if (req.body.strType !== undefined) drill.strType = req.body.strType;
    if (req.body.strTitle !== undefined) drill.strTitle = req.body.strTitle;
    if (req.body.intEstimatedTime !== undefined)
      drill.intEstimatedTime = req.body.intEstimatedTime;
    if (req.body.aDueDate !== undefined) drill.aDueDate = req.body.aDueDate;
    if (req.body.strGeneralAssignee !== undefined)
      drill.strGeneralAssignee = req.body.strGeneralAssignee;
    if (req.body.strGeneralDescription !== undefined)
      drill.strGeneralDescription = req.body.strGeneralDescription;
    if (req.body.aActionAssignCompletionDate !== undefined)
      drill.aActionAssignCompletionDate = req.body.aActionAssignCompletionDate;
    if (req.body.strActionNarrative !== undefined)
      drill.strActionNarrative = req.body.strActionNarrative;
    if (req.body.strActionNarrativeFuture !== undefined)
      drill.strActionNarrativeFuture = req.body.strActionNarrativeFuture;
    if (req.body.strParticipatingCrewIds !== undefined)
      drill.strParticipatingCrewIds = req.body.strParticipatingCrewIds;
    if (req.body.strCrewLists !== undefined)
      drill.strCrewLists = req.body.strCrewLists;

    drillModel.create(drill, async function (err, result) {
      if (err) {
        console.log(err.errors);
        if (err.errors) {
          if (err.errors.strCategory) {
            res.status(400).json({ msg: err.errors.strCategory.message });
            return;
          } else if (err.errors.intEstimatedTime) {
            res.status(400).json({ msg: err.errors.intEstimatedTime.message });
            return;
          }
        }
        res.status(400).json({ msg: "Creat failed", data: null });
      } else {
        var update_drill = {};
        update_drill.strCode = "DR#" + result._id;
        await drillModel.findByIdAndUpdate(
          result._id,
          update_drill,
          async function (err, update) {
            //  start user log //
            var userLog = {};
            userLog.intRecipientId = req.userId;
            userLog.intLogType = 4;
            userLog.intDrillId = result._id; 
            //  end user log //
            let orderDate = moment(new Date()).format("YYYY-MM-DD");
            var dataInf = {};
            dataInf.orderStatus = "Draft";
            dataInf.revisedDate = "";
            dataInf.printedDate = "";
            dataInf.orderDate = orderDate;
            await entrydrillsModel.find(
              {},
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
                log_tmp.key = 1;
                log_tmp.strDate = moment(new Date());
                log_tmp.strTime = moment(new Date());
                log_tmp.strLocation = "";
                if (drill.strStatus == "complete") {
                  log_tmp.strDescription =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  completed by " +
                    req.body.operationUser +
                    ".";
                  userLog.strSubject = "Drill (" + update_drill.strCode + ") - (" + req.body.strGeneralDescription + ") has been completed.";
                } else if (drill.strStatus == "approve") {
                  log_tmp.strDescription =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  approved by " +
                    req.body.operationUser +
                    ".";
                  userLog.strSubject = "Drill (" + update_drill.strCode + ") - (" + req.body.strGeneralDescription + ") has been approved.";
                } else {
                  log_tmp.strDescription =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  created by " +
                    req.body.operationUser +
                    ".";
                  userLog.strSubject = "Drill (" + update_drill.strCode + ") - (" + req.body.strGeneralDescription + ") has been created.";
                }
                log_array.push(log_tmp);
                
                logNotificationModel.create(userLog, function (err, logResult) {
                });
                console.log(result,'gg',JSON.stringify(result[result.length-1]),'ttttt');
                if (result.length == 0) {
                  dataInf.entryDrills = JSON.stringify(log_array);
                  entrydrillsModel.create(dataInf, function (err, result) {
                    if (err) {
                      console.log(err);
                    } else console.log("created===========");
                  });
                } else {
                  // dataInf = result;
                  var res = result[result.length - 1];
                  dataInf = res;
                  log_array = JSON.parse(res.entryDrills);
                  log_array.push(log_tmp);
                  dataInf.entryDrills = JSON.stringify(log_array);
                  entrydrillsModel.findByIdAndUpdate(
                    res._id,
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
            ); // end  drillModel

            await entryVesselListModel.findOne(
              { orderDate: orderDate },
              function (err, result) {
                dataInf.printedDate = null;
                dataInf.crewComplement = "[]";
                dataInf.weather = "[]";
                dataInf.timePeriod = "";

                var log_array = [];
                var log_tmp = {};
                log_tmp.key = 1;
                log_tmp.strTime = moment(new Date());
                log_tmp.strCode = "";
                if (drill.strStatus == "complete") {
                  log_tmp.strExplanation =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ") completed by " +
                    req.body.operationUser +
                    ".";
                } else if (drill.strStatus == "approve") {
                  log_tmp.strExplanation =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  approved by " +
                    req.body.operationUser +
                    ".";
                } else {
                  log_tmp.strExplanation =
                    "Drill (" +
                    update_drill.strCode +
                    ") - (" +
                    req.body.strGeneralDescription +
                    ")  created by " +
                    req.body.operationUser +
                    ".";
                }
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
                      if (err) console.log(err, "update error!.");
                      else {
                        console.log("updated=============");
                      }
                    }
                  );
                }
              }
            );

            res.status(201).json({
              msg: "Saved successfully!",
              data: { id: result._id, strCode: update_drill.strCode },
            });
          }
        );
      }
    });
  },
};
