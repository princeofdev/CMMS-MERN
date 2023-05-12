const workordertaskModel = require("../models/workordertask");
const entrydrillsModel = require("../models/entrydrills");
const workOrderNotificationModel = require("../models/workordernotification");
const moment = require("moment");
const e = require("cors");
const { sendEmail } = require("../utils");
module.exports = {
  getById: function (req, res, next) {
    workordertaskModel
      .findById(req.params.Id)
      .populate("intAssetID")
      .populate("intAssignedToUserID")
      .populate("intCompletedByUserID")
      .then(function (data) {
        res.status(200).json({ msg: "Found!", data: data });
      })
      .catch(function (err) {
        res.status(500).json({ msg: "Internal Server error" });
      });
  },

  getAll: function (req, res, next) {
    workordertaskModel
      .find({ intWorkOrderID: req.params.Id })
      .populate("intAssetID")
      .populate("intAssignedToUserID")
      .populate("intCompletedByUserID")
      .then(function (data) {
        res.status(200).json({ msg: "Found!", data: data });
      })
      .catch(function (err) {
        res.status(500).json({ msg: "Internal Server error" });
      });
  },

  updateById: function (req, res, next) {
    var data = {};
    data.intWorkOrderID = req.body.intWorkOrderID;
    data.intTaskType = req.body.intTaskType;
    data.strResult = req.body.strResult;
    data.intAssetID = req.body.intAssetID;
    data.intOrder = req.body.intOrder;
    data.dtmStartDate = req.body.dtmStartDate;
    data.dtmDateCompleted = req.body.dtmDateCompleted;
    data.intCompletedByUserID = req.body.intCompletedByUserID;
    data.intAssignedToUserID = req.body.intAssignedToUserID;
    data.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
    data.dblTimeSpentHours = req.body.dblTimeSpentHours;
    data.intMeterReadingUnitID = req.body.intMeterReadingUnitID;
    data.strDescription = req.body.strDescription;
    data.strTaskNotesCompletion = req.body.strTaskNotesCompletion;
    data.intTaskGroupControlID = req.body.intTaskGroupControlID;
    data.intParentWorkOrderTaskID = req.body.intParentWorkOrderTaskID;
    data.bolCompleted = req.body.bolCompleted;
    let orderDate = moment(new Date()).format("YYYY-MM-DD");
    var dataInf = {};
    dataInf.orderStatus = "Draft";
    dataInf.revisedDate = "";
    dataInf.printedDate = "";
    dataInf.orderDate = orderDate;
    workordertaskModel.findByIdAndUpdate(
      req.params.Id,
      data,
     async function (err, info) {
        if (err) res.status(400).json({ msg: "Update failed!" });
        else {
          var userLists = await workOrderNotificationModel.find({ intWorkOrderID: req.body.intWorkOrderID })
            .populate("intUserId")
            .exec();
          var recipients = [];      
          var mailContent = "";
          userLists.map((row) => {
            if (row.bolTaskCompletion)
              recipients.push(row.intUserId.strEmailAddress);
          })
          if (req.body.intTaskType == 3 && req.body.strResult != "") {
            entrydrillsModel.find(
              {},
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
                
                log_tmp.key = 1;
                log_tmp.strDate = moment(new Date());
                log_tmp.strTime = moment(new Date());
                log_tmp.strLocation = "";
                log_tmp.strDescription =
                  "Inspection task of the Work order(WO# " +
                  req.params.Id +
                  ") is completed.";

                if (req.body.strResult == 'Fail') {
                  mailContent = "Inspection task of the Work order(WO# " +
                    req.params.Id+
                    ") is failed.";
                  // sendEmail(req.userEmail, "", mailContent);
                }
                else if (req.body.strResult == 'Pass'){
                  mailContent = "Inspection task of the Work order(WO# " +
                    req.params.Id +
                    ") is failed.";
                }
                if (recipients.length > 0)
                  sendEmail(recipients, "", mailContent);

                log_array.push(log_tmp);
              
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
          else {
            if (req.body.bolCompleted || req.body.dtmDateCompleted != "") {
              mailContent = "Task of the Work order(WO# " +
                req.body.intWorkOrderID +
                ") is completed.";
              if (recipients.length > 0)
                sendEmail(recipients, "", mailContent);
            }
          }

          res.status(200).json({ msg: "Updated successfully!", data: null });
        }
      }
    );
  },

  deleteById: async function (req, res, next) {
    await workordertaskModel
      .deleteMany({ intParentWorkOrderTaskID: req.params.Id })
      .exec();

    await workordertaskModel.findByIdAndRemove(
      req.params.Id,
      function (err, movieInfo) {
        if (err) res.status(400).json({ msg: "Delete failed!" });
        else {
          res.status(200).json({ msg: "Deleted successfully!" });
        }
      }
    );
  },

  create: async function (req, res, next) {   
    if (req.body.intAssetID == "") {
      var data = {};
      data.intWorkOrderID = req.body.intWorkOrderID;
      data.intTaskType = req.body.intTaskType;
      data.strResult = req.body.strResult;
      data.intAssetID = req.body.intAssetID;
      data.intOrder = req.body.intOrder;
      data.dtmStartDate = req.body.dtmStartDate;
      data.dtmDateCompleted = req.body.dtmDateCompleted;
      data.intCompletedByUserID = req.body.intCompletedByUserID;
      data.intAssignedToUserID = req.body.intAssignedToUserID;
      data.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
      data.dblTimeSpentHours = req.body.dblTimeSpentHours;
      data.intMeterReadingUnitID = req.body.intMeterReadingUnitID;
      data.strDescription = req.body.strDescription;
      data.strTaskNotesCompletion = req.body.strTaskNotesCompletion;
      data.intTaskGroupControlID = req.body.intTaskGroupControlID;
      data.intParentWorkOrderTaskID = req.body.intParentWorkOrderTaskID;
      data.bolCompleted =req.body.bolCompleted;
      let orderDate = moment(new Date()).format("YYYY-MM-DD");
      var dataInf = {};
      dataInf.orderStatus = "Draft";
      dataInf.revisedDate = "";
      dataInf.printedDate = "";
      dataInf.orderDate = orderDate;
      console.log('dddd',data);
      await workordertaskModel.create(data, async function (err, result) {
        if (err) {
          res.status(400).json({ msg: "Creat failed", data: null });
        } else {
          var userLists = await workOrderNotificationModel.find({ intWorkOrderID: req.body.intWorkOrderID })
            .populate("intUserId")
            .exec();
          var recipients = [];
          userLists.map((row) => {
            if (row.bolTaskCompletion)
              recipients.push(row.intUserId.strEmailAddress);
          })
          var mailContent = "";
          if (req.body.intTaskType == 3) {
            entrydrillsModel.find(
              {},
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
               
                log_tmp.key = 1;
                log_tmp.strDate = moment(new Date());
                log_tmp.strTime = moment(new Date());
                log_tmp.strLocation = "";
                if (req.body.strResult != "") {
                  log_tmp.strDescription =
                    "Inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is completed.";                               

                  if (req.body.strResult == 'Fail') {
                    mailContent = "Inspection task of the Work order(WO# " +
                      req.body.intWorkOrderID+
                      ") is failed.";
                    // sendEmail(req.userEmail, "", mailContent);
                  }
                  else if (req.body.strResult == 'Pass') {
                    mailContent = "Inspection task of the Work order(WO# " +
                      req.body.intWorkOrderID +
                      ") is passed.";
                    // sendEmail(req.userEmail, "", mailContent);
                  }
                  // else {
                  //   mailContent = "Inspection task of the Work order(WO# " +
                  //     req.body.intWorkOrderID +
                  //     ") is created.";
                  //   sendEmail(req.userEmail, "", mailContent);
                  // }
                  if (recipients.length > 0)
                    sendEmail(recipients, "", mailContent);

                } else {
                  log_tmp.strDescription =
                    "Inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is created.";
                  mailContent = "Inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is created.";                   
                  sendEmail(req.userEmail, "", mailContent);
                }

                log_array.push(log_tmp);              
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
          else{
            if (req.body.bolCompleted || req.body.dtmDateCompleted!=""){
              mailContent = "Task of the Work order(WO# " +
                req.body.intWorkOrderID +
                ") is completed.";
              if (recipients.length > 0)
                sendEmail(recipients, "", mailContent);
            }
          }
          res
            .status(200)
            .json({ msg: "Created successfully!", data: { id: result._id } });
        }
      });
    } else {
      var temp = req.body.intAssetID.toString();
      temp = temp.split(",");
      for (var i = 0; i < temp.length; i++) {
        var data = {};
        data.intWorkOrderID = req.body.intWorkOrderID;
        data.intTaskType = req.body.intTaskType;
        data.strResult = req.body.strResult;
        data.intAssetID = temp[i];
        data.intOrder = req.body.intOrder;
        data.dtmStartDate = req.body.dtmStartDate;
        data.dtmDateCompleted = req.body.dtmDateCompleted;
        data.intCompletedByUserID = req.body.intCompletedByUserID;
        data.intAssignedToUserID = req.body.intAssignedToUserID;
        data.dblTimeEstimatedHours = req.body.dblTimeEstimatedHours;
        data.dblTimeSpentHours = req.body.dblTimeSpentHours;
        data.intMeterReadingUnitID = req.body.intMeterReadingUnitID;
        data.strDescription = req.body.strDescription;
        data.strTaskNotesCompletion = req.body.strTaskNotesCompletion;
        data.intTaskGroupControlID = req.body.intTaskGroupControlID;
        data.intParentWorkOrderTaskID = req.body.intParentWorkOrderTaskID;
        data.bolCompleted=req.body.bolCompleted;

        let orderDate = moment(new Date()).format("YYYY-MM-DD");
        var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.orderDate = orderDate;

        await workordertaskModel.create(data, async function (err, result) {
          var userLists = await workOrderNotificationModel.find({ intWorkOrderID: req.body.intWorkOrderID })
            .populate("intUserId")
            .exec();
          var recipients = [];
          var mailContent="";
          userLists.map((row) => {
            if (row.bolTaskCompletion)
              recipients.push(row.intUserId.strEmailAddress);
          })
          if (req.body.intTaskType == 3) {
            entrydrillsModel.find(
              {},
              function (err, result) {
                var log_array = [];
                var log_tmp = {};
                var mailContent="";
                log_tmp.key = 1;
                log_tmp.strDate = moment(new Date());
                log_tmp.strTime = moment(new Date());
                log_tmp.strLocation = "";

                var recipients = [];
                userLists.map((row) => {
                  if (row.bolTaskCompletion)
                    recipients.push(row.intUserId.strEmailAddress);
                })

                if (req.body.strResult != "") { 
                  log_tmp.strDescription =
                    "Inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is completed.";
                  if (req.body.strResult == 'Fail') {
                    mailContent = "Inspection task of the Work order(WO# " +
                      req.body.intWorkOrderID +
                      ") is failed.";
                    // sendEmail(req.userEmail, "", mailContent);
                  }
                  else if (req.body.strResult == 'Pass') {
                    mailContent = "Inspection task of the Work order(WO# " +
                      req.body.intWorkOrderID +
                      ") is passed.";
                    // sendEmail(req.userEmail, "", mailContent);
                  }

                  if (recipients.length > 0)
                    sendEmail(recipients, "", mailContent);
                } else {
                  log_tmp.strDescription =
                    "An inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is created.";
                  mailContent = "An inspection task of the Work order(WO# " +
                    req.body.intWorkOrderID +
                    ") is created.";
                  sendEmail(req.userEmail, "", mailContent);
                }

                log_array.push(log_tmp);
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
          else {
            if (req.body.bolCompleted || req.body.dtmDateCompleted != "") {
              mailContent = "Task of the Work order(WO# " +
                req.body.intWorkOrderID +
                ") is completed.";
              if (recipients.length > 0)
                sendEmail(recipients, "", mailContent);
            }
          }
        });
      }

      res.status(200).json({ msg: "Saved successfully!" });
    }
  },
  addTask: async function (req, res, next) {
   
    req.body.map((item) => {
      if (item.intAssetID == "") {
        var data = {};
        data.intWorkOrderID = Number(req.params.Id);
        data.intTaskType = item.intTaskType;
        data.strResult = item.strResult;
        data.intAssetID = item.intAssetID._id;
        data.intOrder = item.intOrder;
        data.dtmStartDate = item.dtmStartDate;
        data.dtmDateCompleted = item.dtmDateCompleted;
        data.intCompletedByUserID = item.intCompletedByUserID;
        data.intAssignedToUserID = item.intAssignedToUserID;
        data.dblTimeEstimatedHours = item.dblTimeEstimatedHours;
        data.dblTimeSpentHours = item.dblTimeSpentHours;
        data.intMeterReadingUnitID = item.intMeterReadingUnitID;
        data.strDescription = item.strDescription;
        data.strTaskNotesCompletion = item.strTaskNotesCompletion;
        data.intTaskGroupControlID = item.intTaskGroupControlID;
        data.intParentWorkOrderTaskID = item.intParentWorkOrderTaskID;
        data.bolCompleted=item.bolCompleted;
        
        let orderDate = moment(new Date()).format("YYYY-MM-DD");
        var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.orderDate = orderDate;

        workordertaskModel.create(data, function (err, result) {
          if (err) {
            res.status(400).json({ msg: "Creat failed", data: null });
          } else {
            if (item.intTaskType == 3) {
              entrydrillsModel.find(
                {},
                function (err, result) {
                  var log_array = [];
                  var log_tmp = {};
                  var mailContent="";
                  log_tmp.key = 1;
                  log_tmp.strDate = moment(new Date());
                  log_tmp.strTime = moment(new Date());
                  log_tmp.strLocation = "";
                  if (item.strResult != "") {
                    log_tmp.strDescription =
                      "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is completed.";
                    if (item.strResult == 'Fail') {
                      mailContent = "Inspection task of the Work order(WO# " +
                        item.intWorkOrderID +
                        ") is failed.";
                      sendEmail(req.userEmail, "", mailContent);
                    }
                    else {
                      mailContent = "Inspection task of the Work order(WO# " +
                        item.intWorkOrderID +
                        ") is created.";
                      sendEmail(req.userEmail, "", mailContent);
                    }
                  } else {
                    log_tmp.strDescription =
                      "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is created.";
                    mailContent = "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is created.";
                    sendEmail(req.userEmail, "", mailContent);
                  }
                  log_array.push(log_tmp);                
                  if (result.length == 0) {
                    dataInf.entryDrills = JSON.stringify(log_array);
                    entrydrillsModel.create(dataInf, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else console.log("created=========+=");
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
                        if (err) console.log(err, "update error");
                        else {
                          console.log("updated=========+===");
                        }
                      }
                    );
                  }
                }
              );
            }
            res
              .status(200)
              .json({ msg: "Created successfully!", data: { id: result._id } });
          }
        });
      } else {
        var temp = item.intAssetID.toString();

        temp = temp.split(",");
        // for (var i = 0; i < temp.length; i++) {
        var data = {};
        data.intWorkOrderID = Number(req.params.Id);
        data.intTaskType = item.intTaskType;
        data.strResult = item.strResult;
        // data.intAssetID = temp[i];
        data.intAssetID = item.intAssetID._id;
        data.intOrder = item.intOrder;
        data.dtmStartDate = item.dtmStartDate;
        data.dtmDateCompleted = item.dtmDateCompleted;
        data.intCompletedByUserID = item.intCompletedByUserID;
        data.intAssignedToUserID = item.intAssignedToUserID;
        data.dblTimeEstimatedHours = item.dblTimeEstimatedHours;
        data.dblTimeSpentHours = item.dblTimeSpentHours;
        data.intMeterReadingUnitID = item.intMeterReadingUnitID;
        data.strDescription = item.strDescription;
        data.strTaskNotesCompletion = item.strTaskNotesCompletion;
        data.intTaskGroupControlID = item.intTaskGroupControlID;
        data.intParentWorkOrderTaskID = item.intParentWorkOrderTaskID;

        let orderDate = moment(new Date()).format("YYYY-MM-DD");
        var dataInf = {};
        dataInf.orderStatus = "Draft";
        dataInf.revisedDate = "";
        dataInf.printedDate = "";
        dataInf.orderDate = orderDate;

        workordertaskModel.create(data, function (err, result) {
          if (err) {
            res.status(400).json({ msg: "Creat failed", data: null });
          } else {
            if (item.intTaskType == 3) {
              entrydrillsModel.find(
                {},
                function (err, result) {
                  var log_array = [];
                  var log_tmp = {};
                  log_tmp.key = 1;
                  log_tmp.strDate = moment(new Date());
                  log_tmp.strTime = moment(new Date());
                  log_tmp.strLocation = "";
                  var  mailContent="";
                  if (item.strResult != "") {
                    log_tmp.strDescription =
                      "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is completed.";
                      if(item.strResult=='Fail'){
                        mailContent = "Inspection task of the Work order(WO# " +
                          item.intWorkOrderID +
                          ") is failed.";
                        sendEmail(req.userEmail, "", mailContent);
                      }
                      else{
                        mailContent = "Inspection task of the Work order(WO# " +
                          item.intWorkOrderID +
                          ") is created.";
                        sendEmail(req.userEmail, "", mailContent);
                      }
                   
                  } else {
                    log_tmp.strDescription =
                      "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is created.";
                     mailContent = "Inspection task of the Work order(WO# " +
                      item.intWorkOrderID +
                      ") is created.";
                    sendEmail(req.userEmail, "", mailContent);
                  }

                  log_array.push(log_tmp);
             
                  if (result.length == 0) {
                    dataInf.entryDrills = JSON.stringify(log_array);
                    entrydrillsModel.create(dataInf, function (err, result) {
                      if (err) {
                        console.log(err);
                      } else console.log("created===+=======");
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
                        if (err) console.log(err, "update error");
                        else {
                          console.log("updated=======+=====");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        });
        // }
      }
    });
  },
};
