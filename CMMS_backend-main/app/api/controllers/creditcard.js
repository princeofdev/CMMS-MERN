const CreditCardModel = require("../models/creditcard");

module.exports = {
  getById: function (req, res, next) {
    CreditCardModel.findById(req.params.Id, function (err, asset) {
      if (err) {
        res.status(400).json({ msg: "Not ound" });
      } else {
        res.status(200).json({ msg: "Found!", data: asset });
      }
    });
  },

  getAll: function (req, res, next) {
    CreditCardModel
      .find({})
      .populate("intCurrencyId")
      .sort({ _id: -1 })
      .then(function (data) {
        res.status(200).json({ msg: "Found!", data: data });
      })
      .catch(function (err) {
        console.log(err);
        // If an error occurred, send it to the client
        res.status(500).json({ msg: "Internal Server error" });
      });
  },

  updateById: function (req, res, next) {
    var content = {};
    if (req.body.strCardType != undefined)
      content.strCardType = req.body.strCardType;
    if (req.body.intCurrencyId != undefined)
      content.intCurrencyId = req.body.intCurrencyId;
    if (req.body.strCardNickName != undefined)
      content.strCardNickName = req.body.strCardNickName;
    if (req.body.strCardHolderName != undefined)
      content.strCardHolderName = req.body.strCardHolderName;
    if (req.body.intCardNumber != undefined)
      content.intCardNumber = req.body.intCardNumber;
    if (req.body.dtmExpirationDate != undefined)
      content.dtmExpirationDate = req.body.dtmExpirationDate;
    if (req.body.strZipCode != undefined)
      content.strZipCode = req.body.strZipCode;
    if (req.body.bolImageUploaded != undefined)
      content.bolImageUploaded = req.body.bolImageUploaded;
      CreditCardModel.findByIdAndUpdate(
        req.params.Id,
        content,
        function (err, result) {
          if (err) res.status(400).json({ msg: "Update failed!" });
          else {
            res.status(200).json({ msg: "Updated successfully!", data: null });
          }
        }
      );
  },

  deleteById: function (req, res, next) {
    CreditCardModel.findByIdAndRemove(
      req.params.Id,
      function (err, info) {
        if (err) res.status(400).json({ msg: "Delete failed!" });
        else {
          res.status(200).json({ msg: "Deleted successfully!" });
        }
      }
    );
  },

  create: async function (req, res, next) {
    var content = {};
    content.strCardType = req.body.strCardType;
    content.intCurrencyId = req.body.intCurrencyId;
    content.strCardNickName = req.body.strCardNickName;
    content.strCardHolderName = req.body.strCardHolderName;
    content.intCardNumber = req.body.intCardNumber;
    content.dtmExpirationDate = req.body.dtmExpirationDate;
    content.strZipCode = req.body.strZipCode;
    await CreditCardModel.create(content, function (err, result) {
      if (err) {
        if (err.errors) {
          if (err.errors.strCardType) {
            res
              .status(400)
              .json({ msg: err.errors.strCardType.message });
            return;
          }
        }
        res.status(400).json({ msg: "Failed", data: null });
      } else res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
    });
  },
};
