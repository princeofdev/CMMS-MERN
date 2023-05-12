
const stockModel = require('../models/stock');					

module.exports = {
	getById: function(req, res, next) {
		
		stockModel.findById(req.params.Id, function(err, result){
			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		stockModel
			.find({ intAssetID:req.params.Id})
			.populate("intLocationId")
			.populate("intFacilityID")			
			.sort({ intUpdated: -1 })
			.then(function (data) {
				// If we were able to successfully find an Product with the given id, send it back to the client
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				// If an error occurred, send it to the client
				res.status(500).json({ msg: "Internal Server error" });
			});		

	},

	updateById: function(req, res, next) {
		var data = {};

		data.intAssetID = req.body.intAssetID;
		data.qtyOnHand = req.body.qtyOnHand;
		data.qtyMinQty = req.body.qtyMinQty;
		data.intFacilityID = req.body.intFacilityID;
		data.strAisle = req.body.strAisle;
		data.strRow = req.body.strRow;
		data.strBin = req.body.strBin;
		data.strUuid = req.body.strUuid;
		data.bolDeactivated = req.body.bolDeactivated;
		stockModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		stockModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
		console.log(req.body);
		var data={};
		data.intAssetID = req.body.intAssetID;
		data.qtyOnHand = req.body.qtyOnHand;
		data.qtyMinQty = req.body.qtyMinQty;
		data.intFacilityID = req.body.intFacilityID;
		// data.strAisle = req.body.strAisle;
		// data.strRow = req.body.strRow;
		// data.strBin = req.body.strBin;
		// data.strUuid = req.body.strUuid;
		data.bolDeactivated = req.body.bolDeactivated;
		data.intLocationId = req.body.intLocationId;
	
		stockModel.create(data, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					