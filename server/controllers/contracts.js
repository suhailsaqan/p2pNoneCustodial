const Contract = require("../models/contract");
const {
  createHoldInvoice,
  settleHoldInvoice,
  cancelHoldInvoice,
  lookupInvoice,
  sendPayment,
  decodePayReq,
} = require("../lightning/invoices");
const { invoices, lightning, router } = require("../lightning/connect");

const STATUS_TYPES = {
  NO_INTERACTION: "No interaction yet",
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_PAID_AWAITING_SETTLEMENT: "Contract paid, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
  NEEDS_TO_PAY: "Needs to pay",
  NEEDS_TO_SUBMIT_INVOICE: "Needs to submit invoice",
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
      first_party_task,
      second_party_task,
      first_party_amount,
      second_party_amount,
      oracle_fee,
    } = req.body;
    const contract = await Contract.create({
      contract_name,
      description,
      settlement_date,
      first_party_task,
      second_party_task,
      first_party_amount,
      second_party_amount,
      oracle_fee,
    });
    res.status(201).json(contract);
  } catch (err) {
    next(err);
  }
};

async function getStatus(party, contract) {
  if (parseInt(party) == 1 && contract.first_party_original == undefined) {
    if (
      contract.second_party_original == undefined &&
      contract.second_party_amount > 0
    ) {
      return STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE;
    }
    if (
      contract.second_party_original !== undefined &&
      contract.second_party_amount == 0
    ) {
      pmthash = contract.second_party_pmthash;
      details = await lookupInvoice(pmthash);
      if (details.is_held) {
        return STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT;
      } else if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        return STATUS_TYPES.NEEDS_TO_PAY;
      }
    }
  }
  if (parseInt(party) == 1 && contract.first_party_original !== undefined) {
    if (contract.second_party_original !== undefined) {
      return STATUS_TYPES.NEEDS_TO_PAY;
    }
    pmthash = contract.first_party_pmthash;
    details = await lookupInvoice(pmthash);
    console.log(details);
    if (details.is_held) {
      return STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
    } else if (details.is_canceled) {
      return STATUS_TYPES.CONTRACT_CANCELED;
    } else if (details.is_confirmed) {
      return STATUS_TYPES.CONTRACT_SETTLED;
    } else {
      return STATUS_TYPES.NO_INTERACTION;
    }
  }

  if (parseInt(party) == 2 && contract.second_party_original == undefined) {
    if (contract.first_party_original == undefined) {
      return STATUS_TYPES.NO_INTERACTION;
    } else if (
      contract.first_party_original !== undefined &&
      contract.first_party_amount == 0
    ) {
      pmthash = contract.first_party_pmthash;
      details = await lookupInvoice(pmthash);
      if (details.is_held) {
        return STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT;
      } else if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        return STATUS_TYPES.NEEDS_TO_PAY;
      }
    } else {
      return STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE;
    }
  }
  if (parseInt(party) == 2 && contract.second_party_original !== undefined) {
    if (contract.first_party_original == undefined) {
      return STATUS_TYPES.NEEDS_TO_PAY;
    }

    pmthash = contract.second_party_pmthash;
    details = await lookupInvoice(pmthash);
    console.log(details);
    if (contract.first_party_original !== undefined) {
      return STATUS_TYPES.NEEDS_TO_PAY;
    } else if (details.is_held) {
      return STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
    } else if (details.is_canceled) {
      return STATUS_TYPES.CONTRACT_CANCELED;
    } else if (details.is_confirmed) {
      return STATUS_TYPES.CONTRACT_SETTLED;
    } else {
      return STATUS_TYPES.NO_INTERACTION;
    }
  }
}

exports.getStatus = async (req, res, next) => {
  try {
    const { id, party } = req.params;

    if (parseInt(party) !== 1 && parseInt(party) !== 2) {
      return res.status(404).json({ message: "party can only be 1 or 2" });
    }

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    const state = await getStatus(party, contract);

    return res.status(201).json(state);
  } catch (err) {
    next(err);
  }
};

exports.t = async (req, res, next) => {
  try {
    // TODO: check the status of the contract to be able to settle it
    const { id, party } = req.params;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (parseInt(party) == 1) {
      pmthash = contract.first_party_pmthash;
      invoiceDetails = await lookupInvoice(pmthash);
      console.log(invoiceDetails);

      if (!invoiceDetails.is_confirmed) {
        console.log("confirmed");
        original_invoice = contract.first_party_original;
        paid = await sendPayment(
          "lnbcrt500u1psaluuxpp5xtmevpgk65w7jccqdydn8ttw04q4n3cet9aj8wt7syzpj9pdfnpqdqqcqzpgsp5wl6h6zva0795sly9r8pk22e7z03jpx6y879fvvpshkzaq62gw68q9qyyssqgjj3avzafzhk5u5r9u43fssctruqt6gjukytz70xt4xdukaq2u93auqxayrcl8esl2xhwfsnxf80xhep9fkknqzqkx8qzzzhz3jgu9qpd7u55c",
          1000,
          15
        );
        console.log("paid:", paid);
      }
    }
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

exports.settleContract = async (req, res, next) => {
  try {
    // TODO: check the status of the contract to be able to settle it
    const { id, party } = req.body;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (parseInt(party) == 1) {
      pmthash = contract.first_party_pmthash;
      invoiceDetails = await lookupInvoice(pmthash);
      console.log(invoiceDetails);

      if (!invoiceDetails.is_canceled) {
        original_invoice = contract.first_party_original;
        paid = await sendPayment(original_invoice, 1000, 15);
        console.log(paid);

        if (paid.is_confirmed) {
          payment_preimage = paid.secret;

          await settleHoldInvoice(payment_preimage);

          return res.status(201).json(contract);
        }
        res.status(400).json({ error: "paid.is_confirmed" });
      } else {
        res.status(400).json({ error: "!invoiceDetails.is_canceled" });
      }
    } else if (parseInt(party) == 2) {
      pmthash = contract.second_party_pmthash;
      invoiceDetails = await lookupInvoice(pmthash);

      if (!invoiceDetails.is_canceled) {
        original_invoice = contract.second_party_original;
        paid = await sendPayment(original_invoice, 1000, 15);

        if (paid.is_confirmed) {
          payment_preimage = paid.secret;

          await settleHoldInvoice(payment_preimage);

          return res.status(201).json(contract);
        }
      }
    } else {
      return res.status(400).json({ message: "party can only be 1 or 2" });
    }
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

exports.cancelContract = async (req, res, next) => {
  try {
    // TODO: check the status of the contract to be able to settle it
    const { id, party } = req.body;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (parseInt(party) == 1) {
      pmthash = contract.first_party_pmthash;
    } else if (parseInt(party) == 2) {
      pmthash = contract.second_party_pmthash;
    } else {
      return res.status(400).json({ message: "party can only be 1 or 2" });
    }
    await cancelHoldInvoice(pmthash);
    return res.status(201).json(contract);
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

exports.addInvoice = async (req, res, next) => {
  try {
    // TODO: check the status of the contract to be able to add invoice
    var { id, party, invoice } = req.body;
    invoice = invoice["invoice"];

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    // pricefeed = requests.get(
    //   "https://api.kraken.com/0/public/Ticker?pair=XBTUSD"
    // );
    // krakenprice = pricefeed.json().get("result").get("XXBTZUSD").get("a")[0];
    // sats_per_dollar = int(
    //   float("%.8f" % float(Math.floor(100000000 / int(float(krakenprice)))))
    // );
    // server_fee = int(float(pricect["oracle_fee"])) * sats_per_dollar;
    fee = 1000;

    if (parseInt(party) == 1) {
      if (contract.first_party_hodl == undefined) {
        contract.first_party_original = invoice;

        const details = await decodePayReq(invoice);

        expiry = 10000000;

        first_party_pmthash = details.id;
        contract.first_party_pmthash = first_party_pmthash;

        amount = details.tokens + fee;

        first_party_hodl = await createHoldInvoice(
          expiry,
          first_party_pmthash,
          amount
        );

        contract.first_party_hodl = first_party_hodl;

        contract.save();

        res.status(201).json(contract);
      }
    } else if (parseInt(party) == 2) {
      if (contract.second_party_hodl == undefined) {
        contract.second_party_original = invoice;

        const details = await decodePayReq(invoice);

        expiry = 10000000;

        second_party_pmthash = details.id;
        contract.second_party_pmthash = second_party_pmthash;

        amount = details.tokens + fee;

        second_party_hodl = await createHoldInvoice(
          expiry,
          second_party_pmthash,
          amount
        );

        contract.second_party_hodl = second_party_hodl;

        contract.save();

        res.status(201).json(contract);
      }
    } else {
      return res.status(400).json({ message: "party can only be 1 or 2" });
    }
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};
