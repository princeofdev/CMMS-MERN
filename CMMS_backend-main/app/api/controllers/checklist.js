
const CheckListModel = require('../models/checklist');					

module.exports = {
	getById: function(req, res, next) {
		
		CheckListModel.findById(req.params.Id, function(err, result){
			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {

		CheckListModel.find({ intCharterId: req.params.Id })
			.populate("intAssignedUserId")
			.populate("intFormBuilderId")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});		
	},
	getAllByAssign: function (req, res, next) {

		CheckListModel.find({ intAssignedUserId: req.params.Id })
			.populate("intAssignedUserId")
			.populate("intFormBuilderId")
			.then(function (data) {
				res.status(200).json({ msg: "Found!", data: data });
			})
			.catch(function (err) {
				res.status(500).json({ msg: "Internal Server error" });
			});
	},
	updateById: function(req, res, next) {
		
		var data = {};
		data.intAssignedUserId = req.body.intAssignedUserId;
		data.intCharterId = req.body.intCharterId;
		data.intFormBuilderId = req.body.intFormBuilderId;
		data.isCompleted = req.body.isCompleted;
		CheckListModel.findByIdAndUpdate(req.params.Id, data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		CheckListModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
		var data={};
		data.intAssignedUserId = req.body.intAssignedUserId;
		data.intCharterId = req.body.intCharterId;
		data.intFormBuilderId = req.body.intFormBuilderId;	
		data.isCompleted = req.body.isCompleted;
	
		CheckListModel.create(data, function (err, result) {
			if (err) {					
				// if (err.errors) {	
				// 	if (err.errors.strName) {
				// 		res.status(400).json({ msg: err.errors.strName.message });
				// 		return;
				// 	}						
				// }
				res.status(400).json({ msg: "Creat failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
			
		});
	},
	

}					