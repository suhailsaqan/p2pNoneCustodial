const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv4 = require("uuid").v4;

const STATUS_TYPES = {
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_PAID_AWAITING_SETTLEMENT: "Contract paid, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
  NEEDS_TO_PAY: "Needs to pay",
  NEEDS_TO_SUBMIT_INVOICE: "Needs to submit invoice",
};

const contractSchema = new Schema({
  _id: { type: String, default: () => uuidv4().replace(/\-/g, "") },
  contract_name: { type: String, required: true },
  status: {
    type: String,
    enum: [
      STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT,
      STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT,
      STATUS_TYPES.CONTRACT_CANCELED,
      STATUS_TYPES.CONTRACT_SETTLED,
      STATUS_TYPES.WAITING_ON_OTHER_PARTY,
      STATUS_TYPES.NEEDS_TO_PAY,
      STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE,
    ],
  },
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
  chatroom_id: { type: String },
});

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
