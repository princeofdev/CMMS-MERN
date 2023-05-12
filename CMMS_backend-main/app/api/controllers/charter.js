const charterModel = require("../models/charter");
const assetModel = require("../models/assets");
const projectModel = require("../models/project");
const userModel = require("../models/users");
const logNotificationModel = require("../models/lognotification");
module.exports = {
  
  getById: function (req, res, next) {
    charterModel.findById(req.params.Id, function (err, result) {
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        res.status(200).json({ msg: "Found!", data: result });
      }
    });
  },

  getAll: function (req, res, next) {
    charterModel.find({}, function (err, data) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error" });
      } else {
        res.status(200).json({ msg: "Result found!", data: data });
      }
    });    
  },

  updateById: function (req, res, next) {
    var charter = {};

    if (req.body.charter !== undefined)
      charter.charter = req.body.charter;
    if (req.body.reference !== undefined)
      charter.reference = req.body.reference;
    if (req.body.charterStatus !== undefined)
      charter.charterStatus = req.body.charterStatus;
    if (req.body.clientStatus !== undefined)
      charter.clientStatus = req.body.clientStatus;
    if (req.body.ownerStatus !== undefined)
      charter.ownerStatus = req.body.ownerStatus;
    if (req.body.bookingCompany !== undefined)
      charter.bookingCompany = req.body.bookingCompany;
    if (req.body.bookingBroker !== undefined)
      charter.bookingBroker = req.body.bookingBroker;
    if (req.body.startDate !== undefined)
      charter.startDate = req.body.startDate;
    if (req.body.finishDate !== undefined)
      charter.finishDate = req.body.finishDate;
    if (req.body.cruisinArea !== undefined)
      charter.cruisinArea = req.body.cruisinArea;
    if (req.body.pickupPort !== undefined)
      charter.pickupPort = req.body.pickupPort;
    if (req.body.dropOffPort !== undefined)
      charter.dropOffPort = req.body.dropOffPort;
    if (req.body.vesselEntry !== undefined)
      charter.vesselEntry = req.body.vesselEntry;
    if (req.body.slipNumber !== undefined)
      charter.slipNumber = req.body.slipNumber;
    if (req.body.marinaContact !== undefined)
      charter.marinaContact = req.body.marinaContact;
    if (req.body.rate !== undefined) charter.rate = req.body.rate;
    if (req.body.commission !== undefined)
      charter.commission = req.body.commission;
    if (req.body.netToOwner !== undefined)
      charter.netToOwner = req.body.netToOwner;
    if (req.body.currency !== undefined) charter.currency = req.body.currency;
    if (req.body.numberOfGuests !== undefined)
      charter.numberOfGuests = req.body.numberOfGuests;
    if (req.body.typeOfGuests !== undefined)
      charter.typeOfGuests = req.body.typeOfGuests;
    if (req.body.previousCharter !== undefined)
      charter.previousCharter = req.body.previousCharter;
    if (req.body.ownersCharter !== undefined)
      charter.ownersCharter = req.body.ownersCharter;
    if (req.body.references !== undefined)
      charter.references = req.body.references;
    if (req.body.note !== undefined)
      charter.note = req.body.note;

    charterModel.findByIdAndUpdate(
      req.params.Id,
      charter,
      function (err, movieInfo) {
        if (err) res.status(400).json({ msg: "Update failed!" });
        else {
          var logInf = {};
          logInf.strSubject = "Charter (CH# " + req.params.Id + ") has been updated.";
          logInf.intRecipientId = req.userId;
          logInf.intLogType = 6;
          logInf.intCharterId = req.params.Id;
          logNotificationModel.create(logInf, function (err, logResult) {
          });
          res.status(200).json({ msg: "Updated successfully!", data: null });
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    charterModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
      if (err) res.status(400).json({ msg: "Delete failed!" });
      else {
        var logInf = {};
        logInf.strSubject = "Charter (CH# " + req.params.Id + ") has been deleted.";
        logInf.intRecipientId = req.userId;
        logInf.intLogType = 6;
        logInf.intCharterId = req.params.Id;
        logNotificationModel.create(logInf, function (err, logResult) {
        });
        res.status(200).json({ msg: "Deleted successfully!", data: null });
      }
    });
  },

  create: function (req, res, next) {
    var charter = {};
    if (req.body.charter !== undefined) charter.charter = req.body.charter;
    if (req.body.reference !== undefined)
      charter.reference = req.body.reference;
    if (req.body.charterStatus !== undefined)
      charter.charterStatus = req.body.charterStatus;
    if (req.body.clientStatus !== undefined)
      charter.clientStatus = req.body.clientStatus;
    if (req.body.ownerStatus !== undefined)
      charter.ownerStatus = req.body.ownerStatus;
    if (req.body.bookingCompany !== undefined)
      charter.bookingCompany = req.body.bookingCompany;
    if (req.body.bookingBroker !== undefined)
      charter.bookingBroker = req.body.bookingBroker;
    if (req.body.startDate !== undefined)
      charter.startDate = req.body.startDate;
    if (req.body.finishDate !== undefined)
      charter.finishDate = req.body.finishDate;
    if (req.body.cruisinArea !== undefined)
      charter.cruisinArea = req.body.cruisinArea;
    if (req.body.pickupPort !== undefined)
      charter.pickupPort = req.body.pickupPort;
    if (req.body.dropOffPort !== undefined)
      charter.dropOffPort = req.body.dropOffPort;
    if (req.body.vesselEntry !== undefined)
      charter.vesselEntry = req.body.vesselEntry;
    if (req.body.slipNumber !== undefined)
      charter.slipNumber = req.body.slipNumber;
    if (req.body.marinaContact !== undefined)
      charter.marinaContact = req.body.marinaContact;
    if (req.body.rate !== undefined) charter.rate = req.body.rate;
    if (req.body.commission !== undefined)
      charter.commission = req.body.commission;
    if (req.body.netToOwner !== undefined)
      charter.netToOwner = req.body.netToOwner;
    if (req.body.currency !== undefined) charter.currency = req.body.currency;
    if (req.body.numberOfGuests !== undefined)
      charter.numberOfGuests = req.body.numberOfGuests;
    if (req.body.typeOfGuests !== undefined)
      charter.typeOfGuests = req.body.typeOfGuests;
    if (req.body.previousCharter !== undefined)
      charter.previousCharter = req.body.previousCharter;
    if (req.body.ownersCharter !== undefined)
      charter.ownersCharter = req.body.ownersCharter;
    if (req.body.references !== undefined)
      charter.references = req.body.references;
    if (req.body.note !== undefined) charter.note = req.body.note;

    charterModel.create(charter, function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).json({ msg: "Saved failed", data: null });
      } else {
        charterModel.findByIdAndUpdate(
          result._id,
          charter,
          function (err, movieInfo) {
            if (err) res.status(400).json({ msg: "Created failed!" });
            else {
              var logInf = {};
              logInf.strSubject = "Charter (CH# " + result._id + ") has been created.";
              logInf.intRecipientId = req.userId;
              logInf.intLogType = 6;
              logInf.intCharterId = result._id;
              logNotificationModel.create(logInf, function (err, logResult) {
              });
              res.status(200).json({
                msg: "Created successfully!",
                data: { id: result._id },
              });
            }
          }
        );
      }
    });
  },
};
