
const purchaserOrderNotificationModel = require('../models/purchaseordernotification');					

module.exports = {
    getAllById: function(req, res, next) {		//get by group id
        purchaserOrderNotificationModel.find({intUserID:req.params.Id})
        .populate("intAssetID")		
        .then(function(data) {		
            var temp=[];
            for(var i=0;i<data.length;i++){
                if(data[i].intAssetID!=null){
                    temp.push(data[i]);
                }
            }
        res.status(200).json({msg: "Found!", data: temp});	
        })
        .catch(function(err) {		
        res.status(500).json({ msg: "Internal Server error" });
        });
    },

    getAll: function(req, res, next) {
        purchaserOrderNotificationModel.find({ intPurchaseOrderID:req.params.id})
        .populate("intUserID")		
        .then(function(data) {		
        res.status(200).json({msg: "Found!", data: data});	
        })
        .catch(function(err) {		
        res.status(500).json({ msg: "Internal Server error" });
        });
    
    },

    updateById: async function(req, res, next) {
     
        var data = {};
        data.intUserTypeID = req.body.intUserTypeID;
        data.intUserID = req.body.intUserID;
        data.intPurchaseOrderID = req.body.intPurchaseOrderID;

        let assetUser = await purchaserOrderNotificationModel.find({ intPurchaseOrderID: req.body.intPurchaseOrderID,intUserID:req.body.intUserID}).exec();
            
        if(assetUser.length>0  ){
            if(assetUser[0]._id!=req.params.Id){
                res.status(400).json({ msg: "The record with the given Purchase and User already exists", data: null});
                return;
            }
            }

        purchaserOrderNotificationModel.findByIdAndUpdate(req.params.id,data, function(err, movieInfo){

            if(err)
                res.status(400).json({ msg: "updated failed!" });
            else {
                res.status(200).json({ msg: "Updated successfully!", data:null});
            }
        });
    },

    deleteById: function(req, res, next) {
        purchaserOrderNotificationModel.findByIdAndRemove(req.params.Id, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Delete failed!" });
            else {
                res.status(200).json({ msg: "Deleted successfully!"});
            }
        });
    },

    create: async function(req, res, next) {
        //The record with the given Asset and User already exists.
        let notificationtUser = await purchaserOrderNotificationModel.find({ intPurchaseOrderID: req.body.intPurchaseOrderID, intUserID:req.body.intUserID}).exec();
        if (notificationtUser.length>0){
            res.status(400).json({ msg: "The record with the given PurchaseOrder and User already exists", data: null});
            return;
        }   
        console.log(req.body);
        var data={};
        data.intUserTypeID = req.body.intUserTypeID;
        data.intUserID=req.body.intUserID;
        data.intPurchaseOrderID = req.body.intPurchaseOrderID;
        purchaserOrderNotificationModel.create(data, function (err, result) {
            if (err) {
                res.status(400).json({ msg: "Save failed", data: null});
            }				  
            else
                res.status(200).json({msg: "Saved successfully!", data: {id:result._id}});
        });
    },
}					