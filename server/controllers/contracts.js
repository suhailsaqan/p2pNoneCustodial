const Contract = require("../models/contract");
const {
  createHoldInvoice,
  settleHoldInvoice,
  cancelHoldInvoice,
  lookupInvoice,
  sendPayment,
  decodePayReq,
} = require("../lightning/invoices");
const ChatRoomModel = require("../models/chatroom");

const STATUS_TYPES = {
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
    const user = req.user;
    console.log(user);
    const allUsers = [user];
    console.log(allUsers);
    const chatRoom = await ChatRoomModel.initiateChat(allUsers);

    const chatroom_id = chatRoom._id;

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
      chatroom_id,
    });

    const newStatus = await getBothStatus(0, contract);

    contract.status_1 = newStatus["1"];
    contract.status_2 = newStatus["2"];
    await contract.save();

    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("new_status", {
      contractId: contract.id,
      status: newStatus,
    });

    res.status(201).json(contract);
  } catch (err) {
    next(err);
  }
};

async function getStatus(party, contract) {
  console.log("contract", contract);
  if (parseInt(party) == 1 && contract.first_party_original == undefined) {
    if (contract.second_party_original == undefined) {
      if (contract.second_party_amount > 0) {
        return STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE;
      } else {
        return STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    } else if (contract.second_party_original !== undefined) {
      if (contract.second_party_amount == 0) {
        pmthash = contract.second_party_pmthash;
        details = await lookupInvoice(pmthash);
        if (details.is_held) {
          // when first party pays to second party
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
  }
  if (parseInt(party) == 1 && contract.first_party_original !== undefined) {
    pmthash = contract.first_party_pmthash;
    details = await lookupInvoice(pmthash);
    if (contract.second_party_original == undefined) {
      if (details.is_held) {
        return STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
      } else if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        return STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    }
    if (contract.second_party_original !== undefined) {
      if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      }
      pmthash = contract.second_party_pmthash;
      details = await lookupInvoice(pmthash);
      console.log(details);
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

  if (parseInt(party) == 2 && contract.second_party_original == undefined) {
    if (contract.first_party_original == undefined) {
      if (contract.first_party_amount > 0) {
        return STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE;
      } else {
        return STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    }
    if (contract.first_party_original !== undefined) {
      if (contract.first_party_amount == 0) {
        pmthash = contract.first_party_pmthash;
        details = await lookupInvoice(pmthash);
        if (details.is_held) {
          // when second party pays to first party
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
  }
  if (parseInt(party) == 2 && contract.second_party_original !== undefined) {
    pmthash = contract.second_party_pmthash;
    details = await lookupInvoice(pmthash);
    if (contract.first_party_original == undefined) {
      if (details.is_held) {
        return STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT;
      } else if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      } else {
        return STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      }
    }
    if (contract.first_party_original !== undefined) {
      if (details.is_canceled) {
        return STATUS_TYPES.CONTRACT_CANCELED;
      } else if (details.is_confirmed) {
        return STATUS_TYPES.CONTRACT_SETTLED;
      }
      pmthash = contract.first_party_pmthash;
      details = await lookupInvoice(pmthash);
      console.log(details);
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
}

async function getBothStatus(party, contract) {
  let ret = {};
  if (parseInt(party) == 0) {
    ret[1] = await getStatus(1, contract);
    ret[2] = await getStatus(2, contract);
  }
  return ret;
}

exports.getStatus = async (req, res, next) => {
  try {
    let ret = {};

    const { id, party } = req.params;

    if (
      parseInt(party) !== 1 &&
      parseInt(party) !== 2 &&
      parseInt(party) !== 0
    ) {
      return res
        .status(404)
        .json({ message: "party can only be 1, 2 or 0 (for both parties)" });
    }

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (parseInt(party) == 1) {
      ret[1] = await getStatus(1, contract);
    } else if (parseInt(party) == 2) {
      ret[2] = await getStatus(2, contract);
    } else if (parseInt(party) == 0) {
      ret[1] = await getStatus(1, contract);
      ret[2] = await getStatus(2, contract);
    }

    return res.status(201).json(ret);
  } catch (err) {
    next(err);
  }
};

exports.t = async (req, res, next) => {
  try {
    // TODO: check the status of the contract to be able to settle it
    // const { id, party } = req.params;

    // const contract = await Contract.findById(id);
    // if (contract == null) {
    //   return res.status(404).json({ message: "contract not found" });
    // }

    // if (parseInt(party) == 1) {
    //   pmthash = contract.first_party_pmthash;
    //   invoiceDetails = await lookupInvoice(pmthash);
    //   console.log(invoiceDetails);

    //   if (!invoiceDetails.is_confirmed) {
    //     console.log("confirmed");
    //     original_invoice = contract.first_party_original;
    //     paid = await sendPayment(
    //       "lnbcrt500u1psaluuxpp5xtmevpgk65w7jccqdydn8ttw04q4n3cet9aj8wt7syzpj9pdfnpqdqqcqzpgsp5wl6h6zva0795sly9r8pk22e7z03jpx6y879fvvpshkzaq62gw68q9qyyssqgjj3avzafzhk5u5r9u43fssctruqt6gjukytz70xt4xdukaq2u93auqxayrcl8esl2xhwfsnxf80xhep9fkknqzqkx8qzzzhz3jgu9qpd7u55c",
    //       1000,
    //       15
    //     );
    //     console.log("paid:", paid);
    //   }
    // }
    first_party_hodl = await createHoldInvoice(123, "first_party_pmthash", 1);
    console.log(
      "******************************************************",
      first_party_hodl
    );
    return res.status(201).json(first_party_hodl);
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};

async function getSettleStatus(party, contract) {
  ret = {};
  if (parseInt(party) == 0) {
    const status_1 = await getStatus(1, contract);
    if (
      contract.first_party_original !== undefined &&
      (status_1 == STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT ||
        status_1 == STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT)
    ) {
      ret[1] = true;
    } else {
      ret[1] = false;
    }
    const status_2 = await getStatus(2, contract);
    if (
      contract.second_party_original !== undefined &&
      (status_2 == STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT ||
        status_2 == STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT)
    ) {
      ret[2] = true;
    } else {
      ret[2] = false;
    }
    return ret;
  } else {
    const status = await getStatus(party, contract);
    if (parseInt(party) == 1) {
      invoice = contract.first_party_original;
    } else if (parseInt(party) == 2) {
      invoice = contract.second_party_original;
    }
    if (
      invoice !== undefined &&
      (status == STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT ||
        status == STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT)
    ) {
      ret[party] = true;
    } else {
      ret[party] = false;
    }
    return ret;
  }
}

exports.getSettleStatus = async (req, res, next) => {
  try {
    const { id, party } = req.params;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (
      parseInt(party) !== 1 &&
      parseInt(party) !== 2 &&
      parseInt(party) !== 0
    ) {
      return res
        .status(400)
        .json({ message: "party can only be 1, 2 or 0 (for both parties)" });
    }

    const settleState = await getSettleStatus(party, contract);
    return res.status(201).json(settleState);
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
      return res.status(400).json({ message: "contract not found" });
    }

    const allowed = await getSettleStatus(party, contract);

    if (allowed[party] == false) {
      return res
        .status(400)
        .json({ message: "contract cannot be settled at this time" });
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

          const newStatus = await getBothStatus(0, contract);

          contract.status_1 = newStatus["1"];
          contract.status_2 = newStatus["2"];
          await contract.save();

          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("new_status", {
            contractId: id,
            status: newStatus,
          });

          return res.status(201).json(contract);
        }
        // res.status(400).json({ message: "paid.is_confirmed" });
      } else {
        res.status(400).json({ message: "!invoiceDetails.is_canceled" });
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

          const newStatus = await getBothStatus(0, contract);

          contract.status_1 = newStatus["1"];
          contract.status_2 = newStatus["2"];
          await contract.save();

          const eventEmitter = req.app.get("eventEmitter");
          eventEmitter.emit("new_status", {
            contractId: id,
            status: newStatus,
          });

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

async function getCancelStatus(party, contract) {
  ret = {};
  if (parseInt(party) == 0) {
    const status_1 = await getStatus(1, contract);
    if (
      status_1 == STATUS_TYPES.CONTRACT_CANCELED ||
      status_1 == STATUS_TYPES.CONTRACT_SETTLED ||
      contract.first_party_original == undefined
    ) {
      ret[1] = false;
    } else {
      ret[1] = true;
    }
    const status_2 = await getStatus(2, contract);
    if (
      status_2 == STATUS_TYPES.CONTRACT_CANCELED ||
      status_2 == STATUS_TYPES.CONTRACT_SETTLED ||
      contract.second_party_original == undefined
    ) {
      ret[2] = false;
    } else {
      ret[2] = true;
    }
    return ret;
  } else {
    const status = await getStatus(party, contract);
    if (parseInt(party) == 1) {
      invoice = contract.first_party_original;
    } else if (parseInt(party) == 2) {
      invoice = contract.second_party_original;
    }
    if (
      status == STATUS_TYPES.CONTRACT_CANCELED ||
      status == STATUS_TYPES.CONTRACT_SETTLED ||
      invoice == undefined
    ) {
      ret[party] = false;
    } else {
      ret[party] = true;
    }
    return ret;
  }
}

exports.getCancelStatus = async (req, res, next) => {
  try {
    const { id, party } = req.params;

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(400).json({ message: "contract not found" });
    }

    const allowed = await getCancelStatus(party, contract);

    if (allowed[party] == false) {
      return res
        .status(400)
        .json({ message: "contract cannot be canceled at this time" });
    }

    if (
      parseInt(party) !== 1 &&
      parseInt(party) !== 2 &&
      parseInt(party) !== 0
    ) {
      return res
        .status(404)
        .json({ message: "party can only be 1, 2 or 0 (for both parties)" });
    }

    const cancelState = await getCancelStatus(party, contract);

    return res.status(201).json(cancelState);
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

    const newStatus = await getBothStatus(0, contract);

    contract.status_1 = newStatus["1"];
    contract.status_2 = newStatus["2"];
    await contract.save();

    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("new_status", {
      contractId: id,
      status: newStatus,
    });

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

        await contract.save();

        // im not sure if saving it returns the new contract object or not, so i will re 'find' it
        const newContract = await Contract.findById(id);
        const newStatus = await getBothStatus(0, newContract);

        newContract.status_1 = newStatus["1"];
        newContract.status_2 = newStatus["2"];
        await newContract.save();

        const eventEmitter = req.app.get("eventEmitter");
        eventEmitter.emit("new_status", {
          contractId: id,
          status: newStatus,
        });

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

        await contract.save();

        // im not sure if saving it returns the new contract object or not, so i will re 'find' it
        const newContract = await Contract.findById(id);
        const newStatus = await getBothStatus(0, newContract);

        newContract.status_1 = newStatus["1"];
        newContract.status_2 = newStatus["2"];
        await newContract.save();

        const eventEmitter = req.app.get("eventEmitter");
        eventEmitter.emit("new_status", {
          contractId: id,
          status: newStatus,
        });

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
