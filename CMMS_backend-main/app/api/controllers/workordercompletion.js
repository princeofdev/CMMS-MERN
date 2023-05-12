

const workordercompletionModel = require('../models/workordercompletion');
const assetsModel = require('../models/assets');
module.exports = {
    getById: async function(req, res, next) {	
        await workordercompletionModel.findById(req.params.workordercompletionId, async function(err, workordercompletion){
            if (err) {
                res.status(400).json({ msg: "Not found" });
            } else {
                let result=workordercompletion;
                res.status(200).json({msg: "Asset found!", data: result});
            }
        });
    },
    getByFilterId :async function(req, res, next) {	
        var temp_filterIds=req.params.Id;
        temp_filterIds=temp_filterIds.split(",");
        workordercompletionModel.find({intCategoryID:{ $in: temp_filterIds}}, function(err, workordercompletion){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{	
                res.status(200).json({msg: "List found!", data: workordercompletion});							
            }
        });
    }, 
    getAll: function(req, res, next) {
        workordercompletionModel.find({}, function(err, workordercompletion){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{				
                res.status(200).json({msg: "List found!", data: workordercompletion});							
            }
        });
    },

    updateById:async function(req, res, next) {
        var workordercompletion={};
        if (req.body.completionNote !== undefined)
            workordercompletion.strCompletionNote=req.body.completionNote;
        if (req.body.problem !== undefined)
            workordercompletion.strProblem = req.body.problem;
        if (req.body.rootCause !== undefined)
            workordercompletion.strRootCause = req.body.rootCause;
        if (req.body.solution !== undefined)
            workordercompletion.strSolution = req.body.solution;
        if (req.body.intWorkOrderID !== undefined)
            workordercompletion.intWorkOrderID = req.body.intWorkOrderID;
        workordercompletionModel.findByIdAndUpdate(req.params.Id, workordercompletion, function(err, result){
            if(err)
                res.status(400).json({ msg: "Update failed!" });
            else {
                res.status(200).json({ msg: "Updated successfully!", data:{intWorkOrderID:result.intWorkOrderID}});
            }
        });
    },

    deleteById: async function(req, res, next) {
        workordercompletionModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Delete failed!" });
            else {
                res.status(200).json({ msg: "Deleted successfully!"});
            }
        });
    },

    create: async function(req, res, next) {
        workordercompletion={};
        if (req.body.completionNote !== undefined)
            workordercompletion.strCompletionNote=req.body.completionNote;
        if (req.body.problem !== undefined)
            workordercompletion.strProblem=req.body.problem;
        if (req.body.rootCause !== undefined)
            workordercompletion.strRootCause=req.body.rootCause;
        if (req.body.solution !== undefined)
            workordercompletion.strSolution=req.body.solution;
        if (req.body.intWorkOrderID !== undefined)
            workordercompletion.intWorkOrderID=req.body.intWorkOrderID;
        
        workordercompletionModel.create(workordercompletion, function (err, result) {
            if (err) {
                if (err.errors) {
                    if (err.errors.intAssetID) {
                        res.status(400).json({ msg: err.errors.intAssetID.message });
                        return;
                    }
                }
                res.status(400).json({ msg: "Creat failed", data: null});
            }
            else
                res.status(200).json({msg: "Created successfully!", data: {id:result._id}});
		});
    },

    getByWorkorderId: async function(req, res, next) {
        let workordercompletion = await workordercompletionModel.find({intWorkOrderID:req.params.workorderId}).exec();
        // if(workordercompletion.length > 0){
        //     let result=workordercompletion;
        //     res.status(200).json({msg: "Asset found!", data: result});
        // } else {
        //     res.status(400).json({ msg: "Not found" });
        // }
        workordercompletionModel.find({ intWorkOrderID: req.params.workorderId}, function (err, workordercompletion) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: workordercompletion });
            }
        });
    },
}