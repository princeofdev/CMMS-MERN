
const countryModel = require('../models/country');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		countryModel.findById(req.params.Id, function(err, result){
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		countryModel.find({})
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				console.log(err);
				// If an error occurred, send it to the client
				res.status(500).json({ msg: "Internal Server error" });
			});
	},

	updateById: function(req, res, next) {
		
		var data = {};
		data.strLoCode = req.body.strLoCode;
		data.strCountryName = req.body.strCountryName;
		countryModel.findByIdAndUpdate(req.params.Id, data, function(err, result){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		countryModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.strLoCode = req.body.strLoCode;
		data.strCountryName = req.body.strCountryName;
		countryModel.create(data, function (err, result) {

				  if (err) {					
					if (err.errors) {	
						if (err.errors.strName) {
							res.status(400).json({ msg: err.errors.strName.message });
							return;
						  }						
					}
					res.status(400).json({ msg: "Creat failed", data: null});
				  }				  
				  else
				 	 res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
				  
				});
	},
	

}					