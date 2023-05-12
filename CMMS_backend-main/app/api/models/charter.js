const mongoose = require("mongoose");
const unique = require("mongoose-unique-validator");
const autoIncrement = require("mongoose-auto-increment");
// const { schema } = require('./users');
autoIncrement.initialize(mongoose.connection);
//Define a schema
const Schema = mongoose.Schema;

const CharterSchema = new Schema({
  charter: {
    type: String,
  },
  reference: {
    type: String,
  },
  charterStatus: {
    type: String,
  },
  clientStatus: {
    type: String,
  },
  ownerStatus: {
    type: String,
  },
  bookingCompany: {
    type: String,
  },
  bookingBroker: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  finishDate: {
    type: Date,
  },
  cruisinArea: {
    type: String,
    default: "",
  },
  pickupPort: {
    type: String,
  },
  dropOffPort: {
    type: String,
  },
  vesselEntry: {
    type: String,
  },
  strNameUserGuest: {
    type: String,
  },
  slipNumber: {
    type: Number,
  },
  marinaContact: {
    type: String,
  },
  rate: {
    type: String,
  },
  commission: {
    type: String,
  },
  netToOwner: {
    type: String,
  },
  currency: {
    type: String,
  },
  numberOfGuests: {
    type: Number,
  },
  typeOfGuests: {
    type: String,
  },
  previousCharter: {
    type: String,
  },
  ownersCharter: {
    type: String,
  },
  references: {
    type: String,
  },
  note: {
    type: String,
  },
});
// WorkOrderSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
CharterSchema.plugin(autoIncrement.plugin, "Charter");
module.exports = mongoose.model("Charter", CharterSchema);
