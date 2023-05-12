const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    intWorkOrderID: {
        type: Number
    },
    intFileTypeID: {
        type: Number //0-image	
    },
    strName: {
        type: String
    },
    intSize: {
        type: Number		
    },
    strNotes:{
        type: String
    },
    intFileContetsID:{
        type: Schema.Types.Number,
        ref: "FileContents",
    },
    intAssetID:{
        type: Number
    },
    strLink:{
        type: String
    },
    intUpdated:{
        type: Date,
        default: Date.now,
    },
    strUuid:{
        type: String
    },
    dtmDateCreated: { // mine       
        type: Date,
        default: Date.now,
    },
    originalName: { // mine    
        type: String
    },
    strFileType:{
        type:String
    },
    intRequestUserId:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    intPurchaseOrderID: {
        type: Number
    },
    intCreditCardID: {
        type: Number
    },
    strCardImage: {
        type:String
    },
    intRfqID:{
        type:Number
    }
}); 
FileSchema.plugin(autoIncrement.plugin, 'File');
FileSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = mongoose.model('File', FileSchema)