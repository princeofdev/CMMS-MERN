
const portsModel = require('../models/ports');					

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		portsModel.findById(req.params.Id, function(err, result){
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {

		portsModel
			.find()
			.populate("intCountryId")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});

		// portsModel.find({}, function(err, result){
		// 	if (err){
		// 		res.status(500).json({ msg: "Internal Server error" });
		// 	} else{				
		// 		res.status(200).json({msg: "Result found!", data: result});							
		// 	}

		// });
	},

	updateById: function(req, res, next) {
		
		var data = {};
		data.strCountryPrefix = req.body.strCountryPrefix;
		data.strCountryName = req.body.strCountryName;
		data.strLoCode = req.body.strLoCode;
		data.strName = req.body.strName;
		data.strNameWoDiacritics = req.body.strNameWoDiacritics;
		data.strSubDiv = req.body.strSubDiv;
		data.strFunction = req.body.strFunction;
		data.strStatus = req.body.strStatus;
		data.strDate = req.body.strDate;
		data.strIATA = req.body.strIATA;
		data.strCoordinates = req.body.strCoordinates;
		data.strRemarks = req.body.strRemarks;
		data.strPortName = req.body.strPortName;
		portsModel.findByIdAndUpdate(req.params.Id, data, function(err, result){

			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		portsModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.strCountryPrefix = req.body.strCountryPrefix;
		data.strCountryName = req.body.strCountryName;
		data.strLoCode = req.body.strLoCode;
		data.strName = req.body.strName;
		data.strNameWoDiacritics = req.body.strNameWoDiacritics;
		data.strSubDiv = req.body.strSubDiv;
		data.strFunction = req.body.strFunction;
		data.strStatus = req.body.strStatus;
		data.strDate = req.body.strDate;
		data.strIATA = req.body.strIATA;
		data.strCoordinates = req.body.strCoordinates;
		data.strRemarks = req.body.strRemarks;
		data.strPortName = req.body.strPortName;
		portsModel.create(data, function (err, result) {

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