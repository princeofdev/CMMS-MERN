const CodeTypeModel = require("../models/codetype");

module.exports = {
  getById: function (req, res, next) {
    CodeTypeModel.findById(req.params.Id, function (err, asset) {
      if (err) {
        res.status(400).json({ msg: "Not ound" });
      } else {
        res.status(200).json({ msg: "Found!", data: asset });
      }
    });
  },

  getAll: function (req, res, next) {
    CodeTypeModel.find({})
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
    content.strCode = req.body.strCode;
    content.strDescription = req.body.strDescription;
    CodeTypeModel.findByIdAndUpdate(
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
    CodeTypeModel.findByIdAndRemove(
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
    content.strCode = req.body.strCode;
    content.strDescription = req.body.strDescription;
    await CodeTypeModel.create(content, function (err, result) {
      if (err) {
        if (err.errors) {
          if (err.errors.strCode) {
            res
              .status(400)
              .json({ msg: err.errors.strCode.message });
            return;
          }
        }
        res.status(400).json({ msg: "Failed", data: null });
      } else res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
    });
  },
};
