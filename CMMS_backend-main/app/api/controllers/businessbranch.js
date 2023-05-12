
const businessbranchModel = require('../models/businessbranch');
module.exports = {
    getById: async function (req, res, next) {
        await businessbranchModel.findById(req.params.businessgroupId, async function (err, businessgroup) {
            if (err) {
                res.status(400).json({ msg: "Not found" });
            } else {
                let result = businessgroup;
                res.status(200).json({ msg: "Asset found!", data: result });
            }
        });
    },
    getByFilterId: async function (req, res, next) {
        var temp_filterIds = req.params.Id;
        temp_filterIds = temp_filterIds.split(",");
        businessbranchModel.find({ intCategoryID: { $in: temp_filterIds } }, function (err, businessgroups) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: businessgroups });
            }
        });
    },
    getAll: function (req, res, next) {
        businessbranchModel.find({ intBusinessID: req.params.businessId }, function (err, businessgroups) {
            if (err) {
                res.status(500).json({ msg: "Internal Server error." });
            } else {
                res.status(200).json({ msg: "List found!", data: businessgroups });
            }
        });
    },

    updateById: async function (req, res, next) {
        var data = {};
        if (req.body.strIsoPort !== undefined)
            data.strIsoPort = req.body.strIsoPort;
        if (req.body.strTelephone !== undefined)
            data.strTelephone = req.body.strTelephone;
        if (req.body.strFax !== undefined)
            data.strFax = req.body.strFax;
        if (req.body.strContactInfo !== undefined)
            data.strContactInfo = req.body.strContactInfo;
        if (req.body.strContactEmail !== undefined)
            data.strContactEmail = req.body.strContactEmail;
        if (req.body.strOrderSubmissionEmail !== undefined)
            data.strOrderSubmissionEmail = req.body.strOrderSubmissionEmail;
        if (req.body.strAddress !== undefined)
            data.strAddress = req.body.strAddress;
        if (req.body.intBusinessID !== undefined)
            data.intBusinessID = req.body.intBusinessID;
        if (req.body.strStreet1 !== undefined)
            data.strStreet1 = req.body.strStreet1;
        if (req.body.strStreet2 !== undefined)
            data.strStreet2 = req.body.strStreet2;
        if (req.body.strCity !== undefined)
            data.strCity = req.body.strCity;
        if (req.body.strProvince !== undefined)
            data.strProvince = req.body.strProvince;
        if (req.body.strPostalCode !== undefined)
            data.strPostalCode = req.body.strPostalCode;
        if (req.body.strCountry !== undefined)
            data.strCountry = req.body.strCountry;

        businessbranchModel.findByIdAndUpdate(req.params.Id, data, function (err, movieInfo) {
            if (err)
                res.status(400).json({ msg: "Update failed!" });
            else {
                res.status(200).json({ msg: "Updated successfully!", data: null });
            }
        });
    },

    deleteById: async function (req, res, next) {
        businessbranchModel.findByIdAndRemove(req.params.Id, function (err, movieInfo) {
            if (err)
                res.status(400).json({ msg: "Delete failed!" });
            else {
                res.status(200).json({ msg: "Deleted successfully!" });
            }
        });
    },

    create: async function (req, res, next) {
        var data = {};
        data.intBusinessID = req.body.intBusinessID;
        data.strIsoPort = req.body.strIsoPort;
        data.strTelephone = req.body.strTelephone;
        data.strFax = req.body.strFax;
        data.strContactInfo = req.body.strContactInfo;
        data.strContactEmail = req.body.strContactEmail;
        data.strOrderSubmissionEmail = req.body.strOrderSubmissionEmail;
        data.strAddress = req.body.strAddress;
        data.strStreet1 = req.body.strStreet1;
        data.strStreet2 = req.body.strStreet2;
        data.strCity = req.body.strCity;
        data.strProvince = req.body.strProvince;
        data.strPostalCode = req.body.strPostalCode;
        data.strCountry = req.body.strCountry;


        businessbranchModel.create(data, function (err, result) {
            if (err) {
                res.status(400).json({ msg: "Creat failed", data: null });
            }
            else
                res.status(200).json({ msg: "Created successfully!", data: { id: result._id } });
        });
    }

}