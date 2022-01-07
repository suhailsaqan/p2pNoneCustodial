const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv4 = require("uuid").v4;

const contractSchema = new Schema({
  _id: { type: String, default: () => uuidv4().replace(/\-/g, "") },
  contract_name: { type: String },
  description: { type: String },
  first_party_role: { type: String },
  first_party_amount: { type: Number },
  first_party_original: { type: String },
  first_party_hodl: { type: String },
  first_party_pmthash: { type: String },
  second_party_role: { type: String },
  second_party_amount: { type: Number },
  second_party_original: { type: String },
  second_party_hodl: { type: String },
  second_party_pmthash: { type: String },
  settlement_date: { type: Number },
  automatic: { type: Number, default: 0 },
  btc_price: { type: Number, default: 0 },
  usdt_amount: { type: Number, default: 0 },
  usdt_address: { type: Number, default: 0 },
  private: { type: Number, default: 0 },
  oracle_fee: { type: Number },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
