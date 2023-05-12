const DrillCategoryModel = require("../models/drillcategory");

module.exports = {
  getById: function (req, res, next) {
    DrillCategoryModel.findById(req.params.assetId, function (err, asset) {
      if (err) {
        res.status(400).json({ msg: "Not ound" });
      } else {
        res.status(200).json({ msg: "Found!", data: asset });
      }
    });
  },

  getAll: function (req, res, next) {
    DrillCategoryModel.find({ intAssetID: req.params.Id })
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
    content.strDrillCategoryName = req.body.strDrillCategoryName;
    content.strDescription = req.body.strDescription;
    DrillCategoryModel.findByIdAndUpdate(
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
    DrillCategoryModel.findByIdAndRemove(
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
    var content = {};
    content.strDrillCategoryName = req.body.strDrillCategoryName;
    content.strDescription = req.body.strDescription;
    await DrillCategoryModel.create(content, function (err, result) {
      if (err) {
        if (err.errors) {
          if (err.errors.strDrillCategoryName) {
            res
              .status(400)
              .json({ msg: err.errors.strDrillCategoryName.message });
            return;
          }
        }
        res.status(400).json({ msg: "Failed", data: null });
      } else res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
    });
  },
};
