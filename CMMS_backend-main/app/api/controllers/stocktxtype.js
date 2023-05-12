
const stocktxtypeModel = require('../models/stocktxtype');

module.exports = {
	getById: function(req, res, next) {
		
		stocktxtypeModel.findById(req.params.Id, function(err, result){
			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		stocktxtypeModel.find({}, function(err, status){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: status});							
			}

		});
	},

	updateById: function(req, res, next) {
		var data = {};
		data.strName = req.body.strName;
		
		stocktxtypeModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		stocktxtypeModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err){
				if (err.errors) {
					if (err.errors.strName) {
						res.status(400).json({ msg: err.errors.strName.message });
						return;
					}
				}
				res.status(400).json({ msg: "Delete failed!" });
			}
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.strName = req.body.strName;
	
		stocktxtypeModel.create(data, function (err, result) {
			if (err) {
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					