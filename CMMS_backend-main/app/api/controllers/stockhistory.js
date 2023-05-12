
const stockhistoryModel = require('../models/stockhistory');

module.exports = {
	getById: function(req, res, next) {
		
		stockhistoryModel.findById(req.params.Id, function(err, result){
			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		stockhistoryModel.find({}, function(err, status){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: status});							
			}

		});
	},

	updateById: function(req, res, next) {
		var data = {};
		data.dblLastPrice = req.body.dblLastPrice;
		data.intInventoryMethodType = req.body.intInventoryMethodType;
		data.intStockID = req.body.intStockID;
		data.intStockTxID = req.body.intStockTxID;
		data.intStockTxTypeID = req.body.intStockTxTypeID;
		data.intUserID = req.body.intUserID;
		data.qtyAfter = req.body.qtyAfter;
		data.qtyBefore = req.body.qtyBefore;
		data.qtyMethodQty = req.body.qtyMethodQty;
		data.qtyQuantity = req.body.qtyQuantity;
		stockhistoryModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		stockhistoryModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.dblLastPrice = req.body.dblLastPrice;
		data.intInventoryMethodType = req.body.intInventoryMethodType;
		data.intStockID = req.body.intStockID;
		data.intStockTxID = req.body.intStockTxID;
		data.intStockTxTypeID = req.body.intStockTxTypeID;
		data.intUserID = req.body.intUserID;
		data.qtyAfter = req.body.qtyAfter;
		data.qtyBefore = req.body.qtyBefore;
		data.qtyMethodQty = req.body.qtyMethodQty;
		data.qtyQuantity = req.body.qtyQuantity;
	
		stockhistoryModel.create(data, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					