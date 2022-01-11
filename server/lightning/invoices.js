const { invoices, lightning, router } = require("./connect");

const getInvoice = async ({ expiry, hash, amount }) => {
  try {
    let request = {
      expiry: expiry,
      hash: hash,
      value: amount,
    };
    const response = invoices.addHoldInvoice(request);

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const settleInvoice = async ({ preimage }) => {
  try {
    let request = {
      preimage: preimage,
    };
    const response = invoices.settleInvoice(request);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const cancelInvoice = async ({ hash }) => {
  try {
    let request = {
      payment_hash: hash,
    };
    const response = invoices.cancelInvoice(request);
    return response;
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
    const response = lightning.lookupInvoice(request);
    return response;
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
    let call = router.sendPayment(request);
    return call;
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
};
