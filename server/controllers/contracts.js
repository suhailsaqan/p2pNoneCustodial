const Contract = require("../models/contract");

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
