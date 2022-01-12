const Contract = require("../models/contract");
const {
  getInvoice,
  settleInvoice,
  cancelInvoice,
  lookupInvoice,
  sendPayment,
  decodePayReq,
} = require("../lightning/invoices");
const { invoices, lightning, router } = require("../lightning/connect");

const STATUS_TYPES = {
  NO_INTERACTION: "No interaction yet",
  CONTRACT_FUNDED_AWAITING_SETTLEMENT: "Contract funded, awaiting settlement",
  CONTRACT_CANCELED: "Canceled",
  CONTRACT_SETTLED: "Settled",
  WAITING_ON_OTHER_PARTY: "Waiting on other party",
};

function toHexString(byteArray) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

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

exports.getStatus = async (req, res, next) => {
  try {
    const { id, party } = req.params;
    let status = null;

    if (parseInt(party) !== 1 && parseInt(party) !== 2) {
      return res.status(404).json({ message: "party can only be 1 or 2" });
    }

    const contract = await Contract.findById(id);
    if (contract == null) {
      return res.status(404).json({ message: "contract not found" });
    }

    if (parseInt(party) == 1 && contract.first_party_original == undefined) {
      status = STATUS_TYPES.NO_INTERACTION;
    }
    if (parseInt(party) == 1 && contract.first_party_original !== undefined) {
      pmthash = contract.first_party_pmthash;
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
    if (parseInt(party) == 2 && contract.second_party_original == undefined) {
      if (contract.first_party_original == undefined) {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      } else {
        status = STATUS_TYPES.NO_INTERACTION;
      }
    }
    if (parseInt(party) == 2 && contract.second_party_original !== undefined) {
      if (contract.first_party_original == undefined) {
        status = STATUS_TYPES.WAITING_ON_OTHER_PARTY;
      } else {
        status = STATUS_TYPES.NO_INTERACTION;
      }
      pmthash = contract.second_party_pmthash;
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
      response = await lookupInvoice(pmthash);
      pmtstatus = response.state;

      if (pmtstatus == 3) {
        original_invoice = contract.first_party_original;
        call = sendPayment(original_invoice, 1000, 15);
        response = [];
        call.on("data", function (data) {
          // A response was received from the server.
          console.log(data);
          response.push(data);
        });
        call.on("end", function () {
          // The server has closed the stream.
          console.log("end");
          cont = true;
        });
        if (cont) {
          pmtstatus = response[2].state;
          if (parseInt(pmtstatus) == 1) {
            payment_preimage_bytes = fullresponse[2].preimage;

            await settleInvoice(
              payment_preimage_bytes,
              function (err, response) {
                console.log(response);
                return res.status(201).json(contract);
              }
            );
          }
        }
      }
    } else if (parseInt(party) == 2) {
      pmthash = contract.second_party_pmthash;
      response = await lookupInvoice(pmthash);
      pmtstatus = response.state;

      if (pmtstatus == 3) {
        original_invoice = contract.second_party_original;
        call = await sendPayment(original_invoice, 1000, 15);
        response = [];
        call.on("data", function (data) {
          // A response was received from the server.
          console.log(data);
          response.push(data);
        });
        call.on("end", function () {
          // The server has closed the stream.
          console.log("end");
          cont = true;
        });
        if (cont) {
          pmtstatus = response[2].state;
          if (parseInt(pmtstatus) == 1) {
            payment_preimage_bytes = fullresponse[2].preimage;

            await settleInvoice(
              payment_preimage_bytes,
              function (err, response) {
                console.log(response);
                return res.status(201).json(contract);
              }
            );
          }
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
    await cancelInvoice(pmthash, function (err, response) {
      console.log(response);
      return res.status(201).json(contract);
    });
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
      contract.first_party_original = invoice;
      console.log(invoice);

      //invoices.decodePayReq
      let request = {
        pay_req: invoice,
      };

      lightning.decodePayReq(request, function (err, response) {
        console.log(response);
        // expiry = parseInt(response["timestamp"]) + parseInt(response["expiry"]);
        expiry = 10000000;

        first_party_pmthash = response.payment_hash;
        console.log(first_party_pmthash);

        contract.first_party_pmthash = first_party_pmthash;

        first_party_pmthash = Buffer.from(first_party_pmthash, "hex");

        amount = response.num_satoshis + fee;

        //lightning.getInvoice
        let request = {
          expiry: expiry,
          hash: first_party_pmthash,
          value: amount,
        };
        invoices.addHoldInvoice(request, function (err, res) {
          console.log("err: ", err);
          console.log("first_party_hodl_invoice", res.payment_request);
          contract.first_party_hodl = res.payment_request;

          contract.save();
        });

        // first_party_hodl_invoice = await getInvoice(
        //   expiry,
        //   first_party_pmthash,
        //   amount
        // );
      });
      res.status(201).json(contract);

      // response = await decodePayReq(invoice);

      // expiry = response["timestamp"] + response["expiry"];

      // first_party_pmthash = response.payment_hash;
      // contract.first_party_pmthash = first_party_pmthash;

      // amount = response.num_satoshis + fee;
      // first_party_hodl_invoice = await getInvoice(
      //   expiry,
      //   first_party_pmthash,
      //   amount
      // );
      // console.log("first_party_hodl_invoice", first_party_hodl_invoice);
      // contract.first_party_hodl = first_party_hodl_invoice;

      // await contract.save();

      // return res.status(201).json(contract);
    } else if (parseInt(party) == 2) {
      contract.second_party_original = invoice;
      console.log(invoice);

      //invoices.decodePayReq
      let request = {
        pay_req: invoice,
      };

      lightning.decodePayReq(request, function (err, response) {
        console.log(response);
        // expiry = parseInt(response["timestamp"]) + parseInt(response["expiry"]);
        expiry = 10000000;

        second_party_pmthash = response.payment_hash;
        console.log(second_party_pmthash);

        contract.second_party_pmthash = second_party_pmthash;

        second_party_pmthash = Buffer.from(second_party_pmthash, "hex");

        amount = response.num_satoshis + fee;

        //lightning.getInvoice
        let request = {
          expiry: expiry,
          hash: second_party_pmthash,
          value: amount,
        };
        invoices.addHoldInvoice(request, function (err, res) {
          console.log("err: ", err);
          console.log("second_party_hodl_invoice", res.payment_request);
          contract.second_party_hodl = res.payment_request;

          contract.save();
        });

        // second_party_hodl_invoice = await getInvoice(
        //   expiry,
        //   second_party_pmthash,
        //   amount
        // );
      });
      res.status(201).json(contract);
    } else {
      return res.status(400).json({ message: "party can only be 1 or 2" });
    }
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({ message: "invalid contract id" });
    return next(err);
  }
};
