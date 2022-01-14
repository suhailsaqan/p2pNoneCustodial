import {
  getContract,
  getContracts,
  createContract,
  getStatus,
  settleContract,
  cancelContract,
  addInvoice,
} from "../util/api";

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

export const FETCH_CONTRACT_REQUEST = "FETCH_CONTRACT_REQUEST";
export const FETCH_CONTRACT_SUCCESS = "FETCH_CONTRACT_SUCCESS";
export const FETCH_CONTRACT_ERROR = "FETCH_CONTRACT_ERROR";

const fetchContractRequest = { type: FETCH_CONTRACT_REQUEST };
const fetchContractSuccess = (contract) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contract,
});
const fetchContractError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContract = (id = "") => async (dispatch) => {
  dispatch(fetchContractRequest);
  try {
    const contracts = await getContract(id);
    dispatch(fetchContractSuccess(contracts));
  } catch (error) {
    dispatch(fetchContractError(error));
  }
};

export const FETCH_CONTRACTS_REQUEST = "FETCH_CONTRACTS_REQUEST";
export const FETCH_CONTRACTS_SUCCESS = "FETCH_CONTRACTS_SUCCESS";
export const FETCH_CONTRACTS_ERROR = "FETCH_CONTRACTS_ERROR";

const fetchContractsRequest = { type: FETCH_CONTRACTS_REQUEST };
const fetchContractsSuccess = (contracts) => ({
  type: FETCH_CONTRACT_SUCCESS,
  contracts,
});
const fetchContractsError = (error) => ({ type: FETCH_CONTRACT_ERROR, error });

export const fetchContracts = () => async (dispatch) => {
  dispatch(fetchContractsRequest);
  try {
    const contracts = await getContracts();
    dispatch(fetchContractsSuccess(contracts));
  } catch (error) {
    dispatch(fetchContractsError(error));
  }
};

export const CREATE_CONTRACT_REQUEST = "CREATE_CONTRACT_REQUEST";
export const CREATE_CONTRACT_SUCCESS = "CREATE_CONTRACT_SUCCESS";
export const CREATE_CONTRACT_ERROR = "CREATE_CONTRACT_ERROR";

const createContractRequest = { type: CREATE_CONTRACT_REQUEST };
const createContractSuccess = (contract) => ({
  type: CREATE_CONTRACT_SUCCESS,
  contract,
});
const createContractError = (error) => ({ type: CREATE_CONTRACT_ERROR, error });

export const attemptCreateContract = (contract) => async (
  dispatch,
  getState
) => {
  dispatch(createContractRequest);
  try {
    const newContract = await createContract(contract);
    dispatch(createContractSuccess(newContract));
  } catch (error) {
    dispatch(createContractError(error));
  }
};

// export const FETCH_STATUS_REQUEST = "FETCH_STATUS_REQUEST";
// export const FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS";
// export const FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR";

export const FETCH_STATUS_1_REQUEST = "FETCH_STATUS_1_REQUEST";
export const FETCH_STATUS_1_SUCCESS = "FETCH_STATUS_1_SUCCESS";
export const FETCH_STATUS_1_ERROR = "FETCH_STATUS_1_ERROR";

export const FETCH_STATUS_2_REQUEST = "FETCH_STATUS_2_REQUEST";
export const FETCH_STATUS_2_SUCCESS = "FETCH_STATUS_2_SUCCESS";
export const FETCH_STATUS_2_ERROR = "FETCH_STATUS_2_ERROR";

// const fetchStatusRequest = { type: FETCH_STATUS_REQUEST };
// const fetchStatusSuccess = (status) => ({
//   type: FETCH_STATUS_SUCCESS,
//   status,
// });
// const fetchStatusError = (error) => ({ type: FETCH_STATUS_ERROR, error });

const fetchStatus1Request = { type: FETCH_STATUS_1_REQUEST };
const fetchStatus1Success = (status) => ({
  type: FETCH_STATUS_1_SUCCESS,
  status,
});
const fetchStatus1Error = (error) => ({ type: FETCH_STATUS_1_ERROR, error });

const fetchStatus2Request = { type: FETCH_STATUS_2_REQUEST };
const fetchStatus2Success = (status) => ({
  type: FETCH_STATUS_2_SUCCESS,
  status,
});
const fetchStatus2Error = (error) => ({ type: FETCH_STATUS_2_ERROR, error });

export const fetchStatus = (id = "", party = "") => async (dispatch) => {
  let request, success, error;
  if (parseInt(party) === 1) {
    request = fetchStatus1Request;
    success = fetchStatus1Success;
    error = fetchStatus1Error;
  } else if (parseInt(party) === 2) {
    request = fetchStatus2Request;
    success = fetchStatus2Success;
    error = fetchStatus2Error;
  } else {
    return "party can only be 1 or 2";
  }
  dispatch(request);
  try {
    const status = await getStatus(id, party);
    dispatch(success(status));
  } catch (err) {
    dispatch(error(err));
  }
};

export const SETTLE_CONTRACT_REQUEST = "SETTLE_CONTRACT_REQUEST";
export const SETTLE_CONTRACT_SUCCESS = "SETTLE_CONTRACT_SUCCESS";
export const SETTLE_CONTRACT_ERROR = "SETTLE_CONTRACT_ERROR";

const settleContractRequest = { type: SETTLE_CONTRACT_REQUEST };
const settleContractSuccess = (contract) => ({
  type: SETTLE_CONTRACT_SUCCESS,
  contract,
});
const settleContractError = (error) => ({ type: SETTLE_CONTRACT_ERROR, error });

export const attemptSettleContract = (id, party) => async (
  dispatch,
  getState
) => {
  dispatch(settleContractRequest);
  try {
    const contract = await settleContract(id, party);
    dispatch(settleContractSuccess(contract));
  } catch (error) {
    dispatch(settleContractError(error));
  }
};

export const CANCEL_CONTRACT_REQUEST = "CANCEL_CONTRACT_REQUEST";
export const CANCEL_CONTRACT_SUCCESS = "CANCEL_CONTRACT_SUCCESS";
export const CANCEL_CONTRACT_ERROR = "CANCEL_CONTRACT_ERROR";

const cancelContractRequest = { type: CANCEL_CONTRACT_REQUEST };
const cancelContractSuccess = (contract) => ({
  type: CANCEL_CONTRACT_SUCCESS,
  contract,
});
const cancelContractError = (error) => ({ type: CANCEL_CONTRACT_ERROR, error });

export const attemptCancelContract = (id, party) => async (
  dispatch,
  getState
) => {
  dispatch(cancelContractRequest);
  try {
    const contract = await cancelContract(id, party);
    dispatch(cancelContractSuccess(contract));
  } catch (error) {
    dispatch(cancelContractError(error));
  }
};

export const ADD_INVOICE_REQUEST = "ADD_INVOICE_REQUEST";
export const ADD_INVOICE_SUCCESS = "ADD_INVOICE_SUCCESS";
export const ADD_INVOICE_ERROR = "ADD_INVOICE_ERROR";

const addInvoiceRequest = { type: ADD_INVOICE_REQUEST };
const addInvoiceSuccess = (contract) => ({
  type: ADD_INVOICE_SUCCESS,
  contract,
});
const addInvoiceError = (error) => ({ type: ADD_INVOICE_ERROR, error });

export const attemptAddInvoice = (id, party, invoice) => async (
  dispatch,
  getState
) => {
  dispatch(addInvoiceRequest);
  try {
    const contract = await addInvoice(id, party, invoice);
    dispatch(addInvoiceSuccess(contract));
  } catch (error) {
    dispatch(addInvoiceError(error));
  }
};

export const SET_MESSAGES_REQUEST = "SET_MESSAGES_REQUEST";
export const SET_MESSAGES_SUCCESS = "SET_MESSAGES_SUCCESS";
export const SET_MESSAGES_ERROR = "SET_MESSAGES_ERROR";

const setMessagesRequest = { type: SET_MESSAGES_REQUEST };
const setMessagesSuccess = (
  payment_not_received,
  payment_received,
  instructions,
  invoice_form,
  completion_message,
  instructions_awaiting_counterparty_invoice,
  instructions_awaiting_counterparty_deposit,
  invoice_container,
  instructions_awaiting_settlement_invoice_submit,
  instructions_awaiting_settlement_invoice_pay,
  payment_sent,
  payment_not_sent,
  instructions_invoiced
) => ({
  type: SET_MESSAGES_SUCCESS,
  payment_not_received,
  payment_received,
  instructions,
  invoice_form,
  completion_message,
  instructions_awaiting_counterparty_invoice,
  instructions_awaiting_counterparty_deposit,
  invoice_container,
  instructions_awaiting_settlement_invoice_submit,
  instructions_awaiting_settlement_invoice_pay,
  payment_sent,
  payment_not_sent,
  instructions_invoiced,
});
const setMessagesError = (error) => ({ type: SET_MESSAGES_ERROR, error });

export const attemptSetMessages = (party) => async (dispatch, getState) => {
  dispatch(setMessagesRequest);
  try {
    var payment_not_received = false;
    var payment_received = false;
    var instructions = false;
    var invoice_form = false;
    var completion_message = false;
    var instructions_awaiting_counterparty_invoice = false;
    var instructions_awaiting_counterparty_deposit = false;
    var invoice_container = false;
    var instructions_awaiting_settlement_invoice_submit = false;
    var instructions_awaiting_settlement_invoice_pay = false;
    var payment_sent = false;
    var payment_not_sent = false;
    var instructions_invoiced = false;

    console.log(
      "actions:",
      party,
      //   getState().contracts.contract,
      getState().contracts.status_1,
      getState().contracts.status_2
    );

    if (parseInt(party) == 1) {
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_SETTLED) {
        payment_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.NEEDS_TO_PAY) {
        invoice_container = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.NO_INTERACTION) {
        if (parseInt(getState().contracts.contract.first_party_amount) > 0) {
          instructions_awaiting_counterparty_invoice = true;
        } else {
          instructions_awaiting_counterparty_deposit = true;
        }
      }
      if (
        getState().contracts.status_1 ==
        STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_submit = true;
        instructions = true;
      }
      if (
        getState().contracts.status_1 ==
        STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_pay = true;
        instructions = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_SETTLED) {
        payment_sent = true;
        completion_message = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_sent = true;
        completion_message = true;
      }
      if (
        getState().contracts.status_1 == STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE
      ) {
        invoice_form = true;
      }
      if (
        parseInt(getState().contracts.contract.second_party_amount) > 0 &&
        getState().contracts.contract.first_party_hodl !== undefined
      ) {
        instructions_invoiced = true;
      }
      if (invoice_form == false) {
        instructions = true;
      }
    } else if (parseInt(party) == 2) {
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.CONTRACT_SETTLED) {
        payment_received = true;
        completion_message = true;
      }
      if (getState().contracts.status_2 == STATUS_TYPES.NEEDS_TO_PAY) {
        invoice_container = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.NO_INTERACTION) {
        if (parseInt(getState().contracts.contract.second_party_amount) > 0) {
          instructions_awaiting_counterparty_invoice = true;
        } else {
          instructions_awaiting_counterparty_deposit = true;
        }
      }
      if (
        getState().contracts.status_2 ==
        STATUS_TYPES.CONTRACT_FUNDED_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_submit = true;
        instructions = true;
      }
      if (
        getState().contracts.status_2 ==
        STATUS_TYPES.CONTRACT_PAID_AWAITING_SETTLEMENT
      ) {
        instructions_awaiting_settlement_invoice_pay = true;
        instructions = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_SETTLED) {
        payment_sent = true;
        completion_message = true;
      }
      if (getState().contracts.status_1 == STATUS_TYPES.CONTRACT_CANCELED) {
        payment_not_sent = true;
        completion_message = true;
      }
      if (
        getState().contracts.status_2 == STATUS_TYPES.NEEDS_TO_SUBMIT_INVOICE
      ) {
        invoice_form = true;
      }
      // CHECK WHAT THIS IS
      if (
        parseInt(getState().contracts.contract.first_party_amount) > 0 &&
        getState().contracts.contract.second_party_hodl !== undefined
      ) {
        instructions_invoiced = true;
      }
      if (invoice_form == false) {
        instructions = true;
      }
    }
    dispatch(
      setMessagesSuccess(
        payment_not_received,
        payment_received,
        instructions,
        invoice_form,
        completion_message,
        instructions_awaiting_counterparty_invoice,
        instructions_awaiting_counterparty_deposit,
        invoice_container,
        instructions_awaiting_settlement_invoice_submit,
        instructions_awaiting_settlement_invoice_pay,
        payment_sent,
        payment_not_sent,
        instructions_invoiced
      )
    );
  } catch (error) {
    dispatch(setMessagesError(error));
  }
};
