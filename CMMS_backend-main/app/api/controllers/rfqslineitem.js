
const rfqslineitemModel = require('../models/rfqslineitem');

module.exports = {
	getById: function (req, res, next) {

		rfqslineitemModel.findById(req.params.Id, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({ msg: "Found!", data: result });
			}
		});
	},
	getAllByRFQId: function (req, res, next) {
		rfqslineitemModel
			.find({ intRFQSId: req.params.Id})
			.populate("intAssetID")		
			.populate("intRequestedByUserID")
			.sort({ dtmDateCreated: -1 })
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	updateById: function (req, res, next) {
		
		var data = {};
		if (req.body.intAssetID != undefined)
			data.intAssetID = req.body.intAssetID;
		if (req.body.strDescription != undefined)
			data.strDescription = req.body.strDescription;
		if (req.body.intQty != undefined)
			data.intQty = req.body.intQty;
		if (req.body.intRFQSId != undefined)
			data.intRFQSId = req.body.intRFQSId;
		if (req.body.intUnitPrice!=undefined)
			data.intUnitPrice = req.body.intUnitPrice;
		if (req.body.intQtyQuoted != undefined)
			data.intQtyQuoted = req.body.intQtyQuoted;
		data.intRequestedByUserID = req.userId;	


		rfqslineitemModel.findByIdAndUpdate(req.params.Id, data, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data: null });
			}
		});
	},

	deleteById: function (req, res, next) {
		rfqslineitemModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
			if (err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!" });
			}
		});
	},

	create: function (req, res, next) {
		var data = {};
		data.intAssetID = req.body.intAssetID;
		data.strDescription = req.body.strDescription;
		data.intQty = req.body.intQty;
		data.intRFQSId = req.body.intRFQSId;
		data.intRequestedByUserID = req.userId;
		data.intQtyQuoted = req.body.intQtyQuoted;
		data.intUnitPrice = req.body.intUnitPrice;
		
		rfqslineitemModel.create(data, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Save failed", data: null });
			}
			else {
				res.status(200).json({ msg: "Saved successfully!", data: { id: result._id } });
			}



		});
	},


}