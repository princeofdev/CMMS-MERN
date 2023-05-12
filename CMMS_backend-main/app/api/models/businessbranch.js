const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const BusinessBranchSchema = new Schema({
  intBusinessID: {
    type: Schema.Types.Number,
    ref: "Business"
  },
  strIsoPort:{
    type:String
  },
  strTelephone: {
    type: String
  },
  strFax: {
    type: String
  },
  strContactInfo: {
    type: String
  },
  strContactEmail: {
    type: String
  },
  strOrderSubmissionEmail: {
    type: String
  },
  strAddress: {
    type: String
  },
  strStreet1:{
    type:String
  },
  strStreet2: {
    type: String
  },
  strCity:{
    type:String
  },
  strProvince:{
    type:String
  },
  strPostalCode:{
    type:String
  },
  strCountry:{
    type:String
  },
  intUpdated: {
    type: Date,
    default: Date.now,
  },  
});
BusinessBranchSchema.plugin(autoIncrement.plugin, "BusinessBranch");
// BusinessSchema.plugin(unique, { message: 'That strCode is already taken.' });
module.exports = mongoose.model("BusinessBranch", BusinessBranchSchema);

//iso port, telephone, fax, contact info , contact email, order submission email, address