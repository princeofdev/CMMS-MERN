
const formbuilderModel = require('../models/formbuilder');					

module.exports = {
	getById: function(req, res, next) {
		
		formbuilderModel.findById(req.params.Id, function(err, result){			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				// res.status(200).json({ msg: "Found!", data: result ? result.formData : [] });
				res.status(200).json({ msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		formbuilderModel.find({}, function(err, status){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: status});							
			}

		});
	},

	updateById: function(req, res, next) {
		
		var data={};
		data.formData = req.body.formData;
		data.intCategoryId = req.body.intCategoryId;
		formbuilderModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		formbuilderModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {	
		var data={};
		data.formData = req.body.formData;	
		data.intCategoryId = req.body.intCategoryId;
		formbuilderModel.create(data,async function (err, result) {


			if (err) {
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else{
				var updateDate={};
				updateDate.formName = "Form# " + result._id;
				await formbuilderModel.findByIdAndUpdate(
					result._id,
					updateDate,
					async function (err, update) {
						res.status(200).json({
							msg: "Saved successfully!",
							data: { id: result._id, data: result }
						});
					});
			}
			
			
		});
	},
	

}					