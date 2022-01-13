// const { invoices, lightning, router } = require("./connect");
const lnd = require("./connect");
// console.log(lnd);
const {
  getInvoice,
  cancelHodlInvoice,
  decodePaymentRequest,
  settleHodlInvoice,
  createHodlInvoice,
  pay,
} = require("lightning");
const asyncRetry = require("async/retry");

const interval = 10;
const times = 1000;

/*@returns via cbk or Promise
{
  [chain_address]: <Backup Address String>
  created_at: <ISO 8601 Date String>
  description: <Description String>
  id: <Payment Hash Hex String>
  mtokens: <Millitokens String>
  request: <BOLT 11 Encoded Payment Request String>
  [secret]: <Hex Encoded Payment Secret String>
  tokens: <Tokens Number>
}*/

// needs hex, not buffer bytes
// needs the date it will expire
const createHoldInvoice = async (expiresAt, hash, amount) => {
  try {
    const { request } = await createHodlInvoice({
      lnd: lnd,
      id: hash,
      tokens: amount,
      expires_at: expiresAt,
    });
    return request;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// DOES NOT RETURN ANYTHING
// needs preimage
const settleHoldInvoice = async (secret) => {
  try {
    await settleHodlInvoice({ lnd: lnd, secret: secret });
  } catch (e) {
    console.log(e);
    return e;
  }
};

// DOES NOT RETURN ANYTHING
const cancelHoldInvoice = async (hash) => {
  try {
    await cancelHodlInvoice({ lnd: lnd, id: hash });
  } catch (e) {
    console.log(e);
    return e;
  }
};

/*@returns via cbk or Promise
{
  [chain_address]: <Fallback Chain Address String>
  cltv_delta: <CLTV Delta Number>
  [confirmed_at]: <Settled at ISO 8601 Date String>
  created_at: <ISO 8601 Date String>
  description: <Description String>
  [description_hash]: <Description Hash Hex String>
  expires_at: <ISO 8601 Date String>
  features: [{
    bit: <BOLT 09 Feature Bit Number>
    is_known: <Feature is Known Bool>
    is_required: <Feature Support is Required To Pay Bool>
    type: <Feature Type String>
  }]
  id: <Payment Hash String>
  [is_canceled]: <Invoice is Canceled Bool>
  is_confirmed: <Invoice is Confirmed Bool>
  [is_held]: <HTLC is Held Bool>
  is_private: <Invoice is Private Bool>
  [is_push]: <Invoice is Push Payment Bool>
  mtokens: <Millitokens String>
  [payment]: <Payment Identifying Secret Hex String>
  payments: [{
    [confirmed_at]: <Payment Settled At ISO 8601 Date String>
    created_at: <Payment Held Since ISO 860 Date String>
    created_height: <Payment Held Since Block Height Number>
    in_channel: <Incoming Payment Through Channel Id String>
    is_canceled: <Payment is Canceled Bool>
    is_confirmed: <Payment is Confirmed Bool>
    is_held: <Payment is Held Bool>
    messages: [{
      type: <Message Type Number String>
      value: <Raw Value Hex String>
    }]
    mtokens: <Incoming Payment Millitokens String>
    [pending_index]: <Pending Payment Channel HTLC Index Number>
    timeout: <HTLC CLTV Timeout Height Number>
    tokens: <Payment Tokens Number>
  }]
  received: <Received Tokens Number>
  received_mtokens: <Received Millitokens String>
  [request]: <Bolt 11 Invoice String>
  secret: <Secret Preimage Hex String>
  tokens: <Tokens Number>
}*/
// DONE
const lookupInvoice = async (id) => {
  try {
    const invoiceDetails = await getInvoice({ lnd: lnd, id: id });
    return invoiceDetails;
  } catch (e) {
    console.log(e);
    return e;
  }
};

/*@returns via cbk or Promise
{
  confirmed_at: <Payment Confirmed At ISO 8601 Date String>
  fee: <Fee Paid Tokens Number>
  fee_mtokens: <Fee Paid Millitokens String>
  hops: [{
    channel: <Standard Format Channel Id String>
    channel_capacity: <Hop Channel Capacity Tokens Number>
    fee_mtokens: <Hop Forward Fee Millitokens String>
    forward_mtokens: <Hop Forwarded Millitokens String>
    timeout: <Hop CLTV Expiry Block Height Number>
  }]
  id: <Payment Hash Hex String>
  is_confirmed: <Is Confirmed Bool>
  is_outgoing: <Is Outoing Bool>
  mtokens: <Total Millitokens Sent String>
  safe_fee: <Payment Forwarding Fee Rounded Up Tokens Number>
  safe_tokens: <Payment Tokens Rounded Up Number>
  secret: <Payment Secret Preimage Hex String>
  tokens: <Total Tokens Sent Number>
}*/
// not sure if timeout needs to be in seconds, docs doesn't explain well
const sendPayment = async (payment_request, timeout_seconds, fee_limit_sat) => {
  try {
    const paid = await pay({
      lnd: lnd,
      request: payment_request,
      max_timeout_height: timeout_seconds,
      max_fee: fee_limit_sat,
    });
    return paid;
  } catch (e) {
    console.log(e);
    return e;
  }
};

/*@returns via cbk or Promise
{
  chain_address: <Fallback Chain Address String>
  [cltv_delta]: <Final CLTV Delta Number>
  created_at: <Payment Request Created At ISO 8601 Date String>
  description: <Payment Description String>
  description_hash: <Payment Longer Description Hash Hex String>
  destination: <Public Key Hex String>
  expires_at: <ISO 8601 Date String>
  features: [{
    bit: <BOLT 09 Feature Bit Number>
    is_known: <Feature is Known Bool>
    is_required: <Feature Support is Required To Pay Bool>
    type: <Feature Type String>
  }]
  id: <Payment Hash Hex String>
  is_expired: <Invoice is Expired Bool>
  mtokens: <Requested Millitokens String>
  [payment]: <Payment Identifier Hex Encoded String>
  routes: [[{
    [base_fee_mtokens]: <Base Routing Fee In Millitokens String>
    [channel]: <Standard Format Channel Id String>
    [cltv_delta]: <CLTV Blocks Delta Number>
    [fee_rate]: <Fee Rate In Millitokens Per Million Number>
    public_key: <Forward Edge Public Key Hex String>
  }]]
  safe_tokens: <Requested Tokens Rounded Up Number>
  tokens: <Requested Tokens Rounded Down Number>
}*/

const decodePayReq = async (pay_req) => {
  try {
    const details = await decodePaymentRequest({ lnd: lnd, request: pay_req });
    return details;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  createHoldInvoice,
  settleHoldInvoice,
  cancelHoldInvoice,
  lookupInvoice,
  sendPayment,
  decodePayReq,
};
