
const workorderbusinessModel = require('../models/workorderbusiness');
const assetsModel = require('../models/assets');
module.exports = {
    getById: async function(req, res, next) {	
        await workorderbusinessModel.findById(req.params.workorderbusinessId, async function(err, workorderbusiness){
            if (err) {
                res.status(400).json({ msg: "Not found" });
            } else {
                let result=workorderbusiness;
                res.status(200).json({msg: "Asset found!", data: result});
            }
        });
    },
    getByFilterId :async function(req, res, next) {	
        var temp_filterIds=req.params.Id;
        temp_filterIds=temp_filterIds.split(",");
        workorderbusinessModel.find({intCategoryID:{ $in: temp_filterIds}}, function(err, workorderbusiness){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{	
                res.status(200).json({msg: "List found!", data: workorderbusiness});							
            }
        });
    }, 
    getAll: function(req, res, next) {
        workorderbusinessModel.find({}, function(err, workorderbusiness){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{				
                res.status(200).json({msg: "List found!", data: workorderbusiness});							
            }
        });
    },

    updateById:async function(req, res, next) {
        var workorderbusiness={};
        if (req.body.strBusinessGroup !== undefined)
            workorderbusiness.strBusinessGroupName=req.body.strBusinessGroup;
        if (req.body.strBusiness !== undefined)
            workorderbusiness.strBusinessName = req.body.strBusiness;
        if (req.body.strAssetName !== undefined)
            workorderbusiness.strAssetName = req.body.strAssetName;
        if (req.body.intWorkOrderID !== undefined)
            workorderbusiness.intWorkOrderID = req.body.intWorkOrderID;
        workorderbusinessModel.findByIdAndUpdate(req.params.Id, workorderbusiness, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Update failed!" });
            else {
                res.status(200).json({ msg: "Updated successfully!", data:null});
            }
        });
    },

    deleteById: async function(req, res, next) {
        workorderbusinessModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Delete failed!" });
            else {
                res.status(200).json({ msg: "Deleted successfully!"});
            }
        });
    },

    create: async function(req, res, next) {
        // let workorderbusiness=await workorderbusinessModel.find({strBusinessName:req.body.strBusiness, strBusinessGroup:req.body.strBusinessGroupName, strAssetName:req.body.strAssetName}).exec();	
        // if(workorderbusiness.length>0){
        //     res.status(400).json({ msg: "The record with the given Asset, Business and BusinessGroup already exists", data: null});
        //     return;
        // }
        // let asset = await assetsModel.findById(req.body.intAssetID);
        // if(asset===null){
        //     res.status(400).json({ msg: "This asset can not be avaiable.", data: null});
        //     return;
        // }
        workorderbusiness={};
        if (req.body.strAssetName !== undefined)
            workorderbusiness.strAssetName=req.body.strAssetName;
        if (req.body.strBusinessGroup !== undefined)
            workorderbusiness.strBusinessGroupName=req.body.strBusinessGroup;
        if (req.body.strBusiness !== undefined)
            workorderbusiness.strBusinessName=req.body.strBusiness;
        if (req.body.intWorkOrderID !== undefined)
            workorderbusiness.intWorkOrderID=req.body.intWorkOrderID;
        
        workorderbusinessModel.create(workorderbusiness, function (err, result) {
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
        // let workorderbusiness = await workorderbusinessModel.find({intWorkOrderID:req.params.workorderId}).exec();
        // if(workorderbusiness.length > 0){
        //     let result=workorderbusiness;
        //     res.status(200).json({msg: "Asset found!", data: result});
        // } else {
        //     res.status(400).json({ msg: "Not found" });
        // }
        workorderbusinessModel.find({ intWorkOrderID: req.params.workorderId }, function (err, workorderbusiness) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: workorderbusiness });
            }
        });
    },
    
}					