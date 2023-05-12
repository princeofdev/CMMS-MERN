
const entryVesselListModel = require('../models/entryvessellist');					

module.exports = {
	getById: function(req, res, next) {
		
		entryVesselListModel.findById(req.params.Id, function(err, result){
			
			if (err) {
				res.status(400).json({ msg: "Not found" });
			} else {
				res.status(200).json({msg: "Found!", data: result});
			}
		});
	},

	getAll: function(req, res, next) {
		entryVesselListModel.find({}, function(err, status){
			if (err){
				res.status(500).json({ msg: "Internal Server error" });
			} else{				
				res.status(200).json({msg: "Result found!", data: status});							
			}

		}).sort({ orderDate:-1});
	},
	printById: function(req, res, next) {
		
		var data={};	
		data.orderDate=req.body.orderDate;
		entryVesselListModel.findByIdAndUpdate(req.params.Id,data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},
	updateById: function(req, res, next) {
		
		var data={};
		data.revisedDate=new Date();
		// data.printedDate=req.body.printedDate;
		data.orderDate=req.body.orderDate;

		data.orderStatus=req.body.orderStatus;
		data.crewComplement=req.body.crewComplement;
		data.weather=req.body.weather;
		data.logEntries=req.body.logEntries;
		data.timePeriod=req.body.timePeriod;
		console.log(data);
		entryVesselListModel.findByIdAndUpdate(req.params.Id,data, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Update failed!" });
			else {
				res.status(200).json({ msg: "Updated successfully!", data:null});
			}
		});
	},

	deleteById: function(req, res, next) {
		entryVesselListModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
			if(err)
				res.status(400).json({ msg: "Delete failed!" });
			else {
				res.status(200).json({ msg: "Deleted successfully!"});
			}
		});
	},

	create: function(req, res, next) {
	
	
		var data={};
	
		data.orderDate=req.body.orderDate;
		data.orderStatus=req.body.orderStatus;	
		data.revisedDate=""	;
		data.printedDate="";
		data.crewComplement=req.body.crewComplement;
		data.weather=req.body.weather;
		data.logEntries=req.body.logEntries;
		data.timePeriod=req.body.timePeriod;

		entryVesselListModel.create(data, function (err, result) {
			if (err) {				
				console.log(err);
				res.status(400).json({ msg: "Failed", data: null});
			}				  
			else
				res.status(200).json({msg: "Saved successfully!", data: {id:result._id}});
			
		});
	},
	

}					