const moment = require("moment");
const assetModel = require("../models/assets");
const assetNumberIdModel = require("../models/assetId");
const assetCategoryModel = require("../models/assetcategory");
const accountModel = require("../models/account");
const chargeDepartmentModel = require("../models/chargedepartment");
const MeterReadingModel = require("../models/meterreading");
const asseteventModel = require("../models/assetevent");
const assetuserModel = require("../models/assetuser");
const assetBusinessModel = require("../models/assetbusiness");
const entryVesselListModel = require("../models/entryvessellist");
const assetUserModel=require("../models/assetuser");
const workOrderNotificationModel=require("../models/workordernotification");
const fileModel=require("../models/file");
const { sendEmail } = require("../utils");
module.exports = {
  getById: async function (req, res, next) {
    // let asset_1 =await assetModel.findById(req.params.assetId).exec();
    await assetModel.findById(req.params.assetId, async function (err, asset) {
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        let assetCategory = await assetCategoryModel
          .findById(asset.intCategoryID)
          .exec();
        let account = await accountModel.findById(asset.intAccountID).exec();
        let chargeDepartment = await chargeDepartmentModel
          .findById(asset.intChargeDepartmentID)
          .exec();
        let parentAsset = await assetModel
          .findById(asset.intAssetParentID)
          .exec();
        let files = await fileModel.find({ intAssetID: req.params.assetId, strFileType: { $not: { "$eq": 'application/pdf' } } }).sort({ dtmDateCreated:-1})
          .exec();
        
        let result = {};
        result.assetCategory = assetCategory == null ? {} : assetCategory;
        result.asset = asset;
        result.account = account == null ? {} : account;
        result.chargeDepartment =
          chargeDepartment == null ? {} : chargeDepartment;
        result.parentAsset = parentAsset == null ? {} : parentAsset;
        result.files = files;
        res.status(200).json({ msg: "Asset found!", data: result });
      }
    });
  },
  getPrintDataById: async function (req, res, next) {
    // let asset_1 =await assetModel.findById(req.params.assetId).exec();
    await assetModel.findById(req.params.assetId, async function (err, asset) {
      if (err) {
        res.status(400).json({ msg: "Not found" });
      } else {
        let assetCategory = await assetCategoryModel
          .findById(asset.intCategoryID)
          .exec();
        let account = await accountModel.findById(asset.intAccountID).exec();
        let chargeDepartment = await chargeDepartmentModel
          .findById(asset.intChargeDepartmentID)
          .exec();
        let parentAsset = await assetModel
          .findById(asset.intAssetParentID)
          .exec();
        let meterReading = await MeterReadingModel.find({
          intAssetID: req.params.assetId,
        })
          .populate("intMeterReadingUnitsID")
          .populate("intSubmittedByUserID")
          .exec();

        let assetEvent = await asseteventModel
          .find({ intAssetID: req.params.assetId })
          .populate("intAssetEventTypeID")
          .populate("intSubmittedByUserID")
          .exec();
        let assetUser = await assetuserModel
          .find({ intAssetID: req.params.assetId })
          .populate("intUserID")
          .exec();
        let assetBusiness = await assetBusinessModel
          .find({ intBusinessId: req.params.assetId })
          .populate("intAssetID")
          .populate("intBusinessId")
          .exec();

        let result = {};
        result.assetCategory = assetCategory == null ? {} : assetCategory;
        result.asset = asset;
        result.account = account == null ? {} : account;
        result.chargeDepartment =
          chargeDepartment == null ? {} : chargeDepartment;
        result.parentAsset = parentAsset == null ? {} : parentAsset;
        result.meterReading = meterReading;
        result.assetEvent = assetEvent;
        result.assetUser = assetUser;
        result.assetBusiness = assetBusiness;

        res.status(200).json({ msg: "Asset found!", data: result });
      }
    });
  },
  getByFilterId: async function (req, res, next) {
    var temp_filterIds = req.params.Id;
    temp_filterIds = temp_filterIds.split(",");
    assetModel.find(
      { intCategoryID: { $in: temp_filterIds } },
      function (err, assets) {
        console.log(assets);
        if (err) {
          res.status(500).json({ msg: "Internal Server error." });
        } else {
          res.status(200).json({ msg: "List found!", data: assets });
        }
      }
    );
  },
  getAll: function (req, res, next) {
    assetModel.find({ intCategoryKind: 4}, function (err, assets) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error." });
      } else {
        res.status(200).json({ msg: "List found!", data: assets });
      }
    });
  },

  updateById: async function (req, res, next) {
    var asset = {};
    var assetKind = req.body.intCategoryKind;
    asset.strName = req.body.strName;
    asset.strDescription = req.body.strDescription;
    asset.strMake = req.body.strMake;
    asset.strModel = req.body.strModel;
    asset.qtyMinStockCount = req.body.qtyMinStockCount;
    asset.strCity = req.body.strCity;
    asset.strShippingTerms = req.body.strShippingTerms;
    asset.strAddress = req.body.strAddress;
    asset.strNotes = req.body.strNotes;
    asset.strProvince = req.body.strProvince;
    asset.intCountryID = req.body.intCountryID;
    asset.strInventoryCode = req.body.strInventoryCode;
    asset.qtyStockCount = req.body.qtyStockCount;
    asset.intSiteID = req.body.intSiteID;
    asset.strRow = req.body.strRow;
    asset.strMASourceProduct = req.body.strMASourceProduct;
    asset.strAisle = req.body.strAisle;
    asset.strBinNumber = req.body.strBinNumber;
    asset.intCategoryID = req.body.intCategoryID;
    asset.strPostalCode = req.body.strPostalCode;
    asset.strSerialNumber = req.body.strSerialNumber;
    asset.strCode = req.body.strCode;
    asset.dblLatitude = req.body.dblLatitude;
    asset.dblLongitude = req.body.dblLongitude;
    asset.strUnspcCode = req.body.strUnspcCode;
    asset.dblLastPrice = req.body.dblLastPrice;
    asset.bolIsBillToFacility = req.body.bolIsBillToFacility;
    asset.intAssetLocationID = req.body.intAssetLocationID;
    asset.bolIsOnline = req.body.bolIsOnline;
    asset.bolIsShippingOrReceivingFacility =
      req.body.bolIsShippingOrReceivingFacility;
    asset.intKind = req.body.intKind;
    asset.strQuotingTerms = req.body.strQuotingTerms;
    asset.intAssetParentID = req.body.intAssetParentID;
    //asset.bolIsRegion=req.body.bolIsRegion;
    //asset.bolIsSite=req.body.bolIsSite;
    asset.intAccountID = req.body.intAccountID;
    asset.intChargeDepartmentID = req.body.intChargeDepartmentID;
    asset.intSuperCategorySysCode = req.body.intSuperCategorySysCode;
    //asset.strCustomerIds=req.body.strCustomerIds;
    //asset.strStockLocation=req.body.strStockLocation;
    //asset.strVendorIds=req.body.strVendorIds;
    //asset.intUpdated=req.body.intUpdated;
    asset.strBarcode = req.body.strBarcode;
    asset.strCountryName = req.body.strCountryName;

    assetModel.findByIdAndUpdate(
      req.params.assetId,
      asset,
      async function (err, result) {
        if (err) res.status(400).json({ msg: "Update failed!" });
        else {    
          res.status(200).json({ msg: "Updated successfully!", data: null });
        }
      }
    );
  },

  deleteById: async function (req, res, next) {
    let finds = await assetModel
      .find({ intAssetParentID: req.params.assetId })
      .exec();
    if (finds.length > 0) {
      res.status(400).json({
        msg:
          "This Asset could not be deleted because there are Assets/Supplies related to it.",
      });
    } else {
      await assetModel.findByIdAndRemove(
        req.params.assetId,
        function (err, movieInfo) {
          if (err) res.status(400).json({ msg: "Delete failed!" });
          else {
            res.status(200).json({ msg: "Deleted successfully!", data: null });
          }
        }
      );
    }
  },

  create: async function (req, res, next) {

    var assetKind = req.body.intCategoryKind;
    var asset = {};
    asset.strName = req.body.strName;
    asset.strDescription = req.body.strDescription;
    asset.strMake = req.body.strMake;
    asset.strModel = req.body.strModel;
    asset.qtyMinStockCount = req.body.qtyMinStockCount;
    asset.strCity = req.body.strCity;
    asset.strShippingTerms = req.body.strShippingTerms;
    asset.strAddress = req.body.strAddress;
    asset.strNotes = req.body.strNotes;
    asset.strProvince = req.body.strProvince;
    asset.intCountryID = req.body.intCountryID;
    asset.strInventoryCode = req.body.strInventoryCode;
    asset.qtyStockCount = req.body.qtyStockCount;
    asset.intSiteID = req.body.intSiteID;
    asset.strRow = req.body.strRow;
    asset.strMASourceProduct = req.body.strMASourceProduct;
    asset.strAisle = req.body.strAisle;
    asset.strBinNumber = req.body.strBinNumber;
    asset.intCategoryID = req.body.intCategoryID;
    asset.strPostalCode = req.body.strPostalCode;
    asset.strSerialNumber = req.body.strSerialNumber;
    asset.strCode = req.body.strCode;
    asset.dblLatitude = req.body.dblLatitude;
    asset.dblLongitude = req.body.dblLongitude;
    asset.strUnspcCode = req.body.strUnspcCode;
    asset.dblLastPrice = req.body.dblLastPrice;
    asset.bolIsBillToFacility = req.body.bolIsBillToFacility;
    asset.intAssetLocationID = req.body.intAssetLocationID;
    asset.bolIsOnline = req.body.bolIsOnline;
    asset.bolIsShippingOrReceivingFacility =
      req.body.bolIsShippingOrReceivingFacility;
    //asset.intKind=req.body.intKind;
    asset.strQuotingTerms = req.body.strQuotingTerms;
    asset.intAssetParentID = req.body.intAssetParentID;
    //asset.bolIsRegion=req.body.bolIsRegion;
    //asset.bolIsSite=req.body.bolIsSite;
    asset.intAccountID = req.body.intAccountID;
    asset.intChargeDepartmentID = req.body.intChargeDepartmentID;
    asset.intSuperCategorySysCode = req.body.intSuperCategorySysCode;
    //asset.strCustomerIds=req.body.strCustomerIds;
    //asset.strStockLocation=req.body.strStockLocation;
    //asset.strVendorIds=req.body.strVendorIds;
    //asset.intUpdated=req.body.intUpdated;
    asset.strBarcode = req.body.strBarcode;
    asset.intCategoryKind = req.body.intCategoryKind;
    asset.strCountryName = req.body.strCountryName;
    // asset.dv_intAccountID=req.body.dv_intAccountID;
    // asset.dv_intCategoryID=req.body.dv_intCategoryID;
    // asset.dv_intSiteID=req.body.dv_intSiteID;
    // asset.dv_intCountryID=req.body.dv_intCountryID;
    // asset.dv_intAssetLocationID=req.body.dv_intAssetLocationID;
    // asset.dv_intChargeDepartmentID=req.body.dv_intChargeDepartmentID;
    // asset.dv_intAssetParentID=req.body.dv_intAssetParentID;
    // asset.cf_getLatestReadingsFor=req.body.cf_getLatestReadingsFor;
    // asset.cf_intDefaultImageFileThumbnailID=req.body.cf_intDefaultImageFileThumbnailID;
    // asset.cf_intDefaultImageFileID=req.body.cf_intDefaultImageFileID;
    // asset.cf_intAddressAssetID=req.body.cf_intAddressAssetID;
    // asset.cf_assetAddressString=req.body.cf_assetAddressString;

    await assetModel.create(asset, async function (err, result) {
      if (err) {
        if (err.errors) {
          if (err.errors.strName) {
            res.status(400).json({ msg: err.errors.strName.message });
            return;
          }
        }
        res.status(400).json({ msg: "Creat failed", data: null });
      } else {
        var update_asset = {};
        // update_asset.bolIsOnline = true;
        update_asset.strCode = "PS#" + result._id;
      
        await assetModel.findByIdAndUpdate(
          result._id,
          update_asset,
          async function (err, update) {            
            res.status(200).json({
              msg: "Saved successfully!",
              data: { id: result._id, data: { id: result._id } },
            });
          }
        );
      }
    });
  },

  createNumberId: function (req, res, next) {

    assetModel.find({}, function (err, assets) {
      if (err) {
        res.status(500).json({ msg: "Internal Server error." });
      } else {
        res.status(200).json({ msg: "List found!", data: assets });
      }
    }).sort({ _id: -1 });

  },
};
