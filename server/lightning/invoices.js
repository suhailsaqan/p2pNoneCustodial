const { invoices, lightning, router } = require("./connect");

const getInvoice = async (expiry, hash, amount) => {
  try {
    let request = {
      expiry: expiry,
      hash: hash,
      value: amount,
    };
    invoices.addHoldInvoice(request, function (err, response) {
      console.log("addHoldInvoice: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const settleInvoice = async (preimage) => {
  try {
    let request = {
      preimage: preimage,
    };
    return invoices.settleInvoice(request, function (err, response) {
      console.log("settleInvoice: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const cancelInvoice = async (hash) => {
  try {
    let request = {
      payment_hash: hash,
    };
    return invoices.cancelInvoice(request, function (err, response) {
      console.log("cancelInvoice: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const lookupInvoice = async (r_hash_str) => {
  try {
    let request = {
      r_hash_str: r_hash_str,
    };
    return lightning.lookupInvoice(request, function (err, response) {
      console.log("lookupInvoice: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const sendPayment = async (payment_request, timeout_seconds, fee_limit_sat) => {
  try {
    let request = {
      payment_request: payment_request,
      timeout_seconds: timeout_seconds,
      fee_limit_sat: fee_limit_sat,
    };
    return router.sendPayment(request, function (err, response) {
      console.log("sendPayment: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const decodePayReq = async (pay_req) => {
  try {
    let request = {
      pay_req: pay_req,
    };
    return lightning.decodePayReq(request, function (err, response) {
      console.log("decodePayReq: ", response);
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  getInvoice,
  settleInvoice,
  cancelInvoice,
  lookupInvoice,
  sendPayment,
  decodePayReq,
};
