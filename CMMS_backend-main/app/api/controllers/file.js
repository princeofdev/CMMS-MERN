const multer = require('multer')
const fileModel = require('../models/file');
const workorderModel = require('../models/workorder');
const filecontentsModel = require('../models/filecontents');
const { sendEmailByPDF } = require("../utils");
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {      
        var datetimestamp = Date.now();
        cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
    }
});
var uploadSingle = multer({ //multer settings
    storage: storage
}).single('file');
module.exports = {
    getById: async function(req, res, next) {	
        await fileModel.findById(req.params.fileId, async function(err, file){
            if (err) {
                res.status(400).json({ msg: "Not found" });
            } else {
                let result=file;
                res.status(200).json({msg: "Asset found!", data: result});
            }
        });
    },
    getByFilterId :async function(req, res, next) {	
        var intWorkOrderID=req.params.Id;
        // temp_filterIds=temp_filterIds.split(",");
        fileModel.find({ intWorkOrderID: intWorkOrderID}, function(err, files){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{	
                res.status(200).json({msg: "List found!", data: files});							
            }
        }).sort({ dtmDateCreated:-1});
    }, 
    getByAssetId: async function (req, res, next) {
        var intAssetId = req.params.Id;
        // temp_filterIds=temp_filterIds.split(",");
        fileModel.find({ intAssetID: intAssetId }, function (err, files) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: files });
            }
        }).sort({ dtmDateCreated: -1 });
    },   
    getByRfqId: async function (req, res, next) {
        
        // temp_filterIds=temp_filterIds.split(",");
        fileModel.find({ intRfqID: req.params.Id }, function (err, files) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: files });
            }
        }).sort({ dtmDateCreated: -1 });
    },
    getByPurchaseId: async function (req, res, next) {
        var intPurchaseOrderID = req.params.Id;
        // temp_filterIds=temp_filterIds.split(",");
        fileModel.find({ intPurchaseOrderID: intPurchaseOrderID }, function (err, files) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: files });
            }
        }).sort({ dtmDateCreated: -1 });
    },
    getByCreditCardId: async function (req, res, next) {
        var intCreditCardID = req.params.Id;
        // temp_filterIds=temp_filterIds.split(",");
        fileModel.find({ intCreditCardID: intCreditCardID }, function (err, files) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: files });
            }
        }).sort({ dtmDateCreated: -1 });
    },
    getAll: function(req, res, next) {
        fileModel.find({}, function(err, files){
            if (err){
                res.status(500).json({ msg: "Internal Server error." });
            } else{				
                res.status(200).json({msg: "List found!", data: files});							
            }
        }).sort({ dtmDateCreated:-1});
    },

    updateById:async function(req, res, next) {
        let workorder = await workorderModel.findById(req.body.intWorkOrderID);
        if(workorder===null){
            res.status(400).json({ msg: "This workorder can not be avaiable.", data: null});
            return;
        }
        let filecontent = await filecontentModel.findById(req.body.intFileContentsID);
        if(filecontent===null){
            res.status(400).json({ msg: "This filecontent can not be avaiable.", data: null});
            return;
        }
        let file={};
        if (req.body.intWorkOrderID !== undefined)
            file.intWorkOrderID=req.body.intWorkOrderID;
        if (req.body.intFileTypeID !== undefined)
            file.intFileTypeID=req.body.intFileTypeID;
        if (req.body.strName !== undefined)
            file.strName=req.body.strName;
        if (req.body.intSize !== undefined)
            file.intSize=req.body.intSize;
        if (req.body.strNotes !== undefined)
            file.strNotes=req.body.strNotes;
        if (req.body.intFileContentsID !== undefined)
            file.intFileContentsID=req.body.intFileContentsID;
        if (req.body.intAssetID !== undefined)
            file.intAssetID=req.body.intAssetID;
        if (req.body.strLink !== undefined)
            file.strLink=req.body.strLink;
        if (req.body.intUpdated !== undefined)
            file.intUpdated=req.body.intUpdated;
        if (req.body.strUuid !== undefined)
            file.strUuid=req.body.strUuid;
        
        fileModel.findByIdAndUpdate(req.params.fileId, file, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Update failed!" });
            else {
                res.status(200).json({ msg: "Updated successfully!", data:null});
            }
        });
    },

    deleteById: async function(req, res, next) {
        fileModel.findByIdAndRemove(req.params.fileId, function(err, movieInfo){
            if(err)
                res.status(400).json({ msg: "Delete failed!" });
            else {
                res.status(200).json({ msg: "Deleted successfully!"});
            }
        });
    },
    upload: async function (req, res, next) {
        console.log('ttttww', req.body, 'this is uploaded file');
        uploadSingle(req, res, function (err) {
            if (err) {
                res.status(400).json({ success: false, msg: "Failed to upload." });
                return;
            }                   
            console.log('tttt', req.body,'this is uploaded file');
             var file={};
            if (req.body.intWorkOrderId !== undefined && req.body.intWorkOrderId !== 'undefined')
                file.intWorkOrderID = req.body.intWorkOrderId;
            if (req.body.intAssetID !== undefined && req.body.intAssetID !== 'undefined')
                file.intAssetID = req.body.intAssetID;
            if (req.body.intPurchaseOrderID !== undefined && req.body.intPurchaseOrderID !== 'undefined')
                file.intPurchaseOrderID = req.body.intPurchaseOrderID;
            if (req.body.intCreditCardID !== undefined && req.body.intCreditCardID !== 'undefined')
                file.intCreditCardID = req.body.intCreditCardID;
            if (req.body.strCardImage !== undefined && req.body.strCardImage !== 'undefined')
                file.strCardImage = req.body.strCardImage;

            if (req.body.strDescription !== undefined)
                file.strNotes = req.body.strDescription;

            if (req.body.intRfqID !== undefined)
                file.intRfqID = req.body.intRfqID;
       


            file.strName = req.file.filename;
            file.intSize = req.file.size;
            file.intSize = req.file.size;
            file.originalName = req.file.originalname;
            file.strLink = req.file.path;
            file.strFileType = req.file.mimetype;
            file.intRequestUserId = req.userId;
            fileModel.create(file, function (err, result) {
                if (err) {        
                    console.log(err)           ;
                    res.status(400).json({ msg: "Creat failed", data: null });
                    return;
                }
                else
                    res.status(200).json({ msg: "Successfully uploaded.", data:result });
            });           
        });
    },
    uploadForMail: async function (req, res, next) {
        console.log(req.file, 'ddd')
        uploadSingle(req, res, async function (err) {
            if (err) {
                res.status(400).json({ success: false, msg: "Failed to upload." });
                return;
            }           
            var file = {};
           
            if (req.body.intPurchaseOrderID !== undefined && req.body.intPurchaseOrderID !== 'undefined')
                file.intPurchaseOrderID = req.body.intPurchaseOrderID;
            // if (req.body.strDescription !== undefined)
                file.strNotes = req.body.strDescription;

            file.strSupplierEmail = req.body.strSupplierEmail;
                        
             // console.log(file,'file');
            var result = await sendEmailByPDF(req.body.strSupplierEmail, req.body.strDescription, req.file.path);
            console.log(result)
            if (result.ok) {
                res.status(200).json({ msg: "Sent successfully!", data: {} });
            }
            else {
                res.status(400).json({ msg: "sending failed!" });
            }

            // res.status(200).json({ msg: "Successfully uploaded.", data: null});
            // file.strName = req.file.filename;
            // file.intSize = req.file.size;
            // file.intSize = req.file.size;
            // file.originalName = req.file.originalname;
            // file.strLink = req.file.path;
            // file.strFileType = req.file.mimetype;
            // file.intRequestUserId = req.userId;
            // fileModel.create(file, function (err, result) {
            //     if (err) {
            //         console.log(err);
            //         res.status(400).json({ msg: "Creat failed", data: null });
            //         return;
            //     }
            //     else
            //         res.status(200).json({ msg: "Successfully uploaded.", data: req.file.path });
            // });
        });
    },
    blank: async function (req, res, next) {       

            res.status(200).json({ msg: "Successfully uploaded.", data: null });       
    },
    create: async function(req, res, next) {
        let workorder = await workorderModel.findById(req.body.intWorkOrderID);
        if(workorder===null){
            res.status(400).json({ msg: "This workorder can not be avaiable.", data: null});
            return;
        }
        let filecontent = await filecontentsModel.findById(req.body.intFileContentsID);
        if(filecontent===null){
            res.status(400).json({ msg: "This filecontent can not be avaiable.", data: null});
            return;
        }
        let file={};
        if (req.body.intWorkOrderID !== undefined)
            file.intWorkOrderID=req.body.intWorkOrderID;
        if (req.body.intFileTypeID !== undefined)
            file.intFileTypeID=req.body.intFileTypeID;
        if (req.body.strName !== undefined)
            file.strName=req.body.strName;
        if (req.body.intSize !== undefined)
            file.intSize=req.body.intSize;
        if (req.body.strNotes !== undefined)
            file.strNotes=req.body.strNotes;
        if (req.body.intFileContentsID !== undefined)
            file.intFileContentsID=req.body.intFileContentsID;
        if (req.body.intAssetID !== undefined)
            file.intAssetID=req.body.intAssetID;
        if (req.body.strLink !== undefined)
            file.strLink=req.body.strLink;
        if (req.body.intUpdated !== undefined)
            file.intUpdated=req.body.intUpdated;
        if (req.body.strUuid !== undefined)
            file.strUuid=req.body.strUuid;
        if (req.body.intPurchaseOrderID !== undefined)
            file.intPurchaseOrderID = req.body.intPurchaseOrderID;
        if (req.body.intRfqID!=undefined)
            file.intRfqID = req.body.intRfqID;
        
        fileModel.create(file, function (err, result) {
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
    }
    
}					