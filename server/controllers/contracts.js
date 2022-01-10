const Contract = require("../models/contract");
const {
  getInvoice,
  settleInvoice,
  cancelInvoice,
  lookupInvoice,
} = require("../controllers/contracts");

const STATUS_TYPES = {
  NO_INTERACTION: "No interaction yet",
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
};

exports.getContract = async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract !== null) {
      return res.status(200).json(contract);
    }
    return res.status(404).json({ message: "contract not found" });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

exports.getContracts = async (req, res, next) => {
  try {
    const contracts = await Contract.find();
    if (contracts !== null) {
      return res.json(contracts);
    }
    return res.status(404).json({ message: "no contracts exist" });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

exports.createContract = async (req, res, next) => {
  try {
    const {
      contract_name,
      description,
      settlement_date,
      first_party_role,
      second_party_role,
      first_party_amount,
      second_party_amount,
      oracle_fee,
    } = req.body;
    const contract = await Contract.create({
      contract_name,
      description,
      settlement_date,
      first_party_role,
      second_party_role,
      first_party_amount,
      second_party_amount,
      oracle_fee,
    });
    res.status(201).json(contract);
  } catch (err) {
    next(err);
  }
};

exports.getStatus = async (req, res, next) => {
  try {
    const { id, party } = req.params;
    let status = null;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (int(party) == 1 && str(contract.first_party_original) == "") {
      status = STATUS_TYPES.NO_INTERACTION;
    }
    if (int(party) == 1 && str(contract.first_party_original) !== "") {
      pmthash = str(contract.first_party_pmthash);
      response = await lookupInvoice(pmthash);
      pmtstatus = response.state;
      if (pmtstatus == 3) {
        status = STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
      } else if (pmtstatus == 2) {
        status = STATUS_TYPES.CONTRACT_CANCELED;
      } else if (pmtstatus == 1) {
        status = STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    }
    if (int(party) == 2 && str(contract.second_party_original == "")) {
      if (str(contract.first_party_original) == "") {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      } else {
        status = STATUS_TYPES.NO_INTERACTION;
      }
    }
    if (int(party) == 2 && str(contract.second_party_original) !== "") {
      if (str(contract.first_party_original) == "") {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      } else {
        status = STATUS_TYPES.NO_INTERACTION;
      }
      pmthash = str(contract.second_party_pmthash);
      response = await lookupInvoice(pmthash);
      pmtstatus = response.state;
      if (pmtstatus == 3) {
        status = STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
      } else if (pmtstatus == 2) {
        status = STATUS_TYPES.CONTRACT_CANCELED;
      } else if (pmtstatus == 1) {
        status = STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    }
    return res.status(201).json(status);
  } catch (err) {
    next(err);
  }
};
