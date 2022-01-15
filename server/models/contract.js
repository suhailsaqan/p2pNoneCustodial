const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv4 = require("uuid").v4;

const contractSchema = new Schema({
  _id: { type: String, default: () => uuidv4().replace(/\-/g, "") },
  contract_name: { type: String, required: true },
  description: { type: String, required: true },
  first_party_task: { type: String, required: true },
  first_party_amount: { type: Number, required: true },
  first_party_original: { type: String },
  first_party_hodl: { type: String },
  first_party_pmthash: { type: String },
  second_party_task: { type: String, required: true },
  second_party_amount: { type: Number, required: true },
  second_party_original: { type: String },
  second_party_hodl: { type: String },
  second_party_pmthash: { type: String },
  settlement_date: { type: Number, required: true },
  automatic: { type: Number, default: 0 },
  btc_price: { type: Number, default: 0 },
  usdt_amount: { type: Number, default: 0 },
  usdt_address: { type: Number, default: 0 },
  private: { type: Number, default: 0 },
  oracle_fee: { type: Number },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
